const express = require('express');
const ValidateLoggedIn = require('../../middleware/ValidateLoggedIn');
const connection = require("../../db/db");
const router = express.Router();
const expenses = require('./expenses');
const income = require('./income');

router.use(ValidateLoggedIn);
router.use("/expenses", expenses);
router.use("/income", income);

router.get("/", (req, res) => {
    const query = `SELECT * FROM Budget WHERE user_id = ?`;

    connection.query(query, [req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No budget found" });
            return;
        }

        const budget = {
            id: results[0].id,
            income: results[0].income,
            expenses: results[0].expenses,
            savings: results[0].savings,
            invest: results[0].invest
        };

        res.status(200).json({ budget });
    });
});

router.post("/", (req, res) => {
    const { income, expenses, savings, invest } = req.body;
    const query = `INSERT INTO Budget (user_id, income, expenses, savings, invest) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [req.session.userId, income, expenses, savings, invest], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error writing to the database" });
            return;
        }

        res.status(201).json({ message: "Budget created successfully", budgetId: results.insertId });
    });
});

router.put("/", (req, res) => {
    const { income, expenses, savings, invest } = req.body;
    const query = `UPDATE Budget SET income = ?, expenses = ?, savings = ?, invest = ? WHERE user_id = ?`;

    connection.query(query, [income, expenses, savings, invest, req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error updating the database" });
            return;
        }

        res.status(200).json({ message: "Budget updated successfully" });
    });
});

module.exports = router;
