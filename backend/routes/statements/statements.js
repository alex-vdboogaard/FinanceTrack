const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

//nested routes
const folder = require("./folders");
const tag = require("./tags");

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

const upload = multer({ storage }).single("pdf");

// GET route to retrieve all top-level folders
router.get("/folders", (req, res) => {
    const sqlFolders = `SELECT * FROM Folder WHERE user_id = ? AND parent_folder_id IS NULL`;

    connection.query(sqlFolders, [req.session.userId], (err, folderResults) => {
        if (err) return res.status(500).json({ message: err.message });

        res.status(200).json({ folders: folderResults });
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
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    let { parent_folder_id } = req.body;
    parent_folder_id = isNaN(parseInt(parent_folder_id, 10))
        ? null
        : parseInt(parent_folder_id, 10);

    const filePath = req.file.path;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.unlink(filePath, () => {});
            console.error("Error reading file:", err);
            return res
                .status(500)
                .json({ message: "File read error", error: err.message });
        }

        const sql =
            "INSERT INTO Statement (name, pdf_blob, user_id, folder_id) VALUES (?, ?, ?, ?)";
        connection.query(
            sql,
            [req.file.originalname, data, req.session.userId, parent_folder_id],
            (err, result) => {
                fs.unlink(filePath, () => {});

                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: err.message });
                }
                if (!parent_folder_id) {
                    res.redirect(`http://localhost:5173/statements`);
                } else {
                    res.redirect(
                        `http://localhost:5173/statements/folder/${parent_folder_id}`
                    );
                }
            }
        );
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
