const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `SELECT * FROM Credit_Score_History WHERE user_id = ${req.session.userId} ORDER BY YEAR DESC, MONTH DESC LIMIT 1`;
    connection.query(query, (err, credit_score) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database" + err.message,
            });
            return;
        }

        res.status(200).json({ credit_score });
    });
});

router.post("/", (req, res) => {
    const { year, month, score, notes = "" } = req.body;
    const query = `INSERT INTO Credit_Score (year, month, score, notes) VALUES (${year}, ${month}, ${score}, ${notes})`;
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
