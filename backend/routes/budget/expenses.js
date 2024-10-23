const express = require('express');
const connection = require("../../db/db");
const router = express.Router();
router.get("/", (req, res) => {
    const query = `SELECT e.id, e.description, e.amount, t.name AS type FROM Recurring_Expense AS e INNER JOIN Expense_Category AS t ON t.id = e.category_id WHERE user_id = ?`;

    connection.query(query, [req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const expenses = results.map(expense => ({
            id: expense.id,
            name: expense.description,
            amount: expense.amount,
            type: expense.type
        }));

        res.status(200).json({ expenses });
    });
});

router.post("/", (req, res) => {
    const { description, amount, categoryId } = req.body;
    const query = `INSERT INTO Recurring_Expense (user_id, description, amount, category_id) VALUES (?, ?, ?, ?)`;

    connection.query(query, [req.session.userId, description, amount, categoryId], (err, results) => {
        if (err) {
            res.status(500).json({ message: `Error writing to the database: ${err.message}` });
            return;
        }

        res.status(201).json({ message: "Expense created successfully" });
    });
});

router.put("/", (req, res) => {
    const { id, name, amount } = req.body;
    const query = `UPDATE Recurring_Expense SET description = ?, amount = ? WHERE id = ? AND user_id = ?`;

    connection.query(query, [name, amount, id, req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error updating the database" });
            return;
        }

        res.status(200).json({ message: "Expense updated successfully" });
    });
});

router.delete("/", (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM Recurring_Expense WHERE id = ? AND user_id = ?`;

    connection.query(query, [id, req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error deleting from the database" });
            return;
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    });
});

router.get("/expense-categories", (req, res) => {
    const query = `SELECT * FROM Expense_Category`;

    connection.query(query, [req.session.userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "No expenses found" });
            return;
        }

        const types = results.map(type => ({
            id: type.id,
            name: type.name
        }));

        res.status(200).json({ types });
    });
})

module.exports = router;
