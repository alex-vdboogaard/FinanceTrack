const express = require('express');
const ValidateLoggedIn = require('../../middleware/ValidateLoggedIn');
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `SELECT * FROM Monthly_Review WHERE user_id = ?`;

    connection.query(query, [req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No review found" });
            return;
        }

        const reviews = results.map(review => ({
            id: review.id,
            income: review.income,
            expenses: review.expenses,
            savings: review.savings,
            invest: review.invest
        }));

        res.status(200).json({ reviews });
    });
});

router.post("/", (req, res) => {
    const { income, expenses, savings, invest } = req.body;
    const query = `INSERT INTO Monthly_Review (user_id, income, expenses, savings, invest) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [req.session.userId, income, expenses, savings, invest], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error writing to the database" });
            return;
        }

        res.status(201).json({ message: "Review created successfully" });
    });
});

router.put("/", (req, res) => {
    const { income, expenses, savings, invest } = req.body;
    const query = `UPDATE Monthly_Review SET income = ?, expenses = ?, savings = ?, invest = ? WHERE user_id = ?`;

    connection.query(query, [income, expenses, savings, invest, req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error updating the database" });
            return;
        }

        res.status(200).json({ message: "Review updated successfully" });
    });
});

module.exports = router;
