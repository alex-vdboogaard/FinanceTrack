const express = require("express");
const ValidateLoggedIn = require("../middleware/ValidateLoggedIn");
const connection = require("../db/db");
const router = express.Router();
router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `
        SELECT * FROM statement WHERE user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database",
            });
            return;
        }

        const statements = results.map((s) => ({
            id: s.id,
            name: s.name,
            path: s.path,
        }));
        res.status(200).json({ statements });
    });
});

router.post("/", async (req, res) => {
    const { name, path } = req.body;

    const query = `INSERT INTO statement (name, path, user_id) VALUES (?,?,?)`;

    connection.query(
        query,
        [name, path, req.session.userId],
        (err, results) => {
            if (err) {
                console.error("Error uploading pdf:", err);
                res.status(500).json({
                    message: "Error uploading pdf",
                });
                return;
            }
            res.status(200).json({
                message: "Pdf uploaded successfully",
                filename: name,
            });
        }
    );
});

module.exports = router;
