const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

//nested routes
const folder = require("./folder");
const tag = require("./tag");

router.use("/folder", folder);
router.use("/tag", tag);

router.use(ValidateLoggedIn);

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage }).array("pdf");

// GET route to retrieve all top-level folders
router.get("/folders", (req, res) => {
    const sqlFolders = `
        SELECT 
            f.id AS folder_id, 
            f.name AS folder_name, 
            f.parent_folder_id, 
            t.id AS tag_id, 
            t.name AS tag_name, 
            t.colour AS tag_colour
        FROM Folder f
        LEFT JOIN Tag t ON f.tag_id = t.id
        WHERE f.user_id = ? AND f.parent_folder_id IS NULL
    `;

    connection.query(sqlFolders, [req.session.userId], (err, folderResults) => {
        if (err) return res.status(500).json({ message: err.message });

        // Transform the results into the desired structure
        const folders = folderResults.map((folder) => ({
            id: folder.folder_id,
            name: folder.folder_name,
            parent_folder_id: folder.parent_folder_id,
            tag: {
                id: folder.tag_id,
                name: folder.tag_name,
                colour: folder.tag_colour,
            },
        }));

        res.status(200).json({ folders });
    });
});

// GET route to retrieve paginated statements
router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is provided
    const limit = 6;
    const offset = (page - 1) * limit;

    // SQL query to get the total count of statements
    const sqlTotalCount = `SELECT COUNT(*) AS total FROM Statement WHERE user_id = ? AND folder_id IS NULL`;

    connection.query(
        sqlTotalCount,
        [req.session.userId],
        (err, countResults) => {
            if (err) return res.status(500).json({ message: err.message });

            const totalStatements = countResults[0].total;
            const totalPages = Math.ceil(totalStatements / limit); // Calculate total pages

            // SQL query to fetch statements with pagination
            const sqlStatements = `SELECT * FROM Statement WHERE user_id = ? LIMIT ? OFFSET ?`;

            connection.query(
                sqlStatements,
                [req.session.userId, limit, offset],
                (err, statementResults) => {
                    if (err)
                        return res.status(500).json({ message: err.message });

                    res.status(200).json({
                        statements: statementResults,
                        totalPages: totalPages,
                        currentPage: page,
                    });
                }
            );
        }
    );
});

// GET route to retrieve recent files
router.get("/recent-files", (req, res) => {
    const sqlRecentFiles = `SELECT * FROM STATEMENT WHERE user_id = ? ORDER BY created_at DESC LIMIT 6`;

    connection.query(
        sqlRecentFiles,
        [req.session.userId],
        (err, recentFilesResults) => {
            if (err) return res.status(500).json({ message: err.message });

            res.status(200).json({ recentFiles: recentFilesResults });
        }
    );
});

// POST route to upload and save a new PDF
router.post("/", upload, (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }

    let { parent_folder_id } = req.body;
    parent_folder_id = isNaN(parseInt(parent_folder_id, 10))
        ? null
        : parseInt(parent_folder_id, 10);

    const filePaths = req.files.map((file) => file.path);

    // Process all files concurrently using Promise.all
    const fileUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
            fs.readFile(file.path, (err, data) => {
                if (err) {
                    fs.unlink(file.path, () => {});
                    console.error("Error reading file:", err);
                    return reject(err); // Reject on error
                }

                const sql =
                    "INSERT INTO Statement (name, pdf_blob, user_id, folder_id) VALUES (?, ?, ?, ?)";
                connection.query(
                    sql,
                    [
                        file.originalname,
                        data,
                        req.session.userId,
                        parent_folder_id,
                    ],
                    (err, result) => {
                        if (err) {
                            fs.unlink(file.path, () => {});
                            console.error("Database error:", err);
                            return reject(err); // Reject on DB error
                        }

                        // File inserted, resolve the promise
                        resolve();
                    }
                );
            });
        });
    });

    // After all files are uploaded, delete them and send the response
    Promise.all(fileUploadPromises)
        .then(() => {
            // Delete all files after processing them
            req.files.forEach((file) => {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            });

            // Redirect after all files are uploaded
            if (!parent_folder_id) {
                res.redirect(`http://localhost:5173/statements`);
            } else {
                res.redirect(
                    `http://localhost:5173/statements/folder/${parent_folder_id}`
                );
            }
        })
        .catch((err) => {
            console.error("Error during file upload process:", err);
            res.status(500).json({
                message: "File upload failed",
                error: err.message,
            });
        });
});

// DELETE route to remove a PDF by ID
router.delete("/", (req, res) => {
    const { id } = req.body;

    const sql = "DELETE FROM Statement WHERE id = ? AND user_id = ?";
    connection.query(sql, [id, req.session.userId], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json({ message: "PDF deleted successfully" });
    });
});

module.exports = router;
