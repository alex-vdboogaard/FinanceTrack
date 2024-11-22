const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `SELECT TOP 1 * FROM Credit_Score WHERE user_id = ${req.session.userId} ORDER BY YEAR DESC, MONTH DESC`;
    connection.query(query, (err, notifications) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database",
            });
            return;
        }

        res.status(200).json({ notifications });
    });
});

router.post("/", (req, res) => {
    const { year, month, score } = req.body;
    const query = `INSERT INTO Credit_Score (year, month, score) VALUES (${year}, ${month}, ${score})`;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error deleting notification",
            });
            return;
        }

        res.status(200).json({ message: "Credit score logged" });
    });
});

module.exports = router;
