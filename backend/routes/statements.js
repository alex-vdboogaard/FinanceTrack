const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ValidateLoggedIn = require("../middleware/ValidateLoggedIn");
const connection = require("../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

const uploadDir = path.join(__dirname, "../uploads");

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

// GET route to retrieve all PDFs for the logged-in user
router.get("/", (req, res) => {
    const sql = `SELECT name, pdf_blob FROM Statement WHERE user_id = ?`;
    connection.query(sql, [req.session.userId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        const statements = results.map((file) => ({
            filename: file.name,
            base64Pdf: file.pdf_blob.toString("base64"),
        }));

        res.status(200).json({ statements });
    });
});

router.post("/", upload, (req, res) => {
    console.log(req.file);
    const filePath = req.file.path; // Path of the uploaded file

    // Log the file path to check if it's correct
    console.log("Uploaded file path:", filePath);

    // Read the uploaded file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            fs.unlink(filePath, () => {}); // Clean up the file on error
            return res.status(500).json({ message: "File read error" });
        }

        const sql =
            "INSERT INTO Statement (name, pdf_blob, user_id) VALUES (?, ?, ?)";
        connection.query(
            sql,
            [req.file.filename, data, req.session.userId],
            (err, result) => {
                fs.unlink(filePath, () => {}); // Ensure file is deleted regardless of outcome

                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: err.message });
                }

                res.status(200).json({
                    message: "PDF saved successfully",
                    statementId: result.insertId,
                });
            }
        );
    });
});

module.exports = router;
