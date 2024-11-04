const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ValidateLoggedIn = require("../middleware/ValidateLoggedIn");
const connection = require("../db/db");
const router = express.Router();

// router.use(ValidateLoggedIn);

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

// GET route to retrieve all PDFs associated with a user_id
router.get("/", (req, res) => {
    const sql = `SELECT id, name, pdf_blob FROM Statement WHERE user_id = ?`;
    connection.query(sql, [req.session.userId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });

        const statements = results.map((file) => ({
            id: file.id,
            filename: file.name,
            base64Pdf: file.pdf_blob.toString("base64"),
        }));

        res.status(200).json({ statements });
    });
});

// POST route to upload and save a new PDF
router.post("/", upload, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

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
            "INSERT INTO Statement (name, pdf_blob, user_id) VALUES (?, ?, ?)";
        connection.query(
            sql,
            [req.file.filename, data, req.session.userId],
            (err, result) => {
                fs.unlink(filePath, () => {});

                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ message: err.message });
                }
                res.redirect("http://localhost:5173/statements");
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
