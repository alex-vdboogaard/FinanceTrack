const express = require("express");
const ValidateLoggedIn = require("../middleware/ValidateLoggedIn");
const connection = require("../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
    SELECT l.id, l.name, l.balance, l.loan_amount, t.name AS type, l.interest_rate, l.term, l.monthly_repayment, bb.name AS bank 
    FROM loan AS l 
    INNER JOIN loan_category AS t ON t.id = l.category_id
    INNER JOIN Bank AS bb ON bb.id = l.bank_id 
    WHERE l.user_id = ${req.session.userId}
    `;

    connection.query(query, (err, loans) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database" + err.message,
            });
            return;
        }

        res.status(200).json({ loans });
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT l.id, l.name, l.balance, l.loan_amount, l.first_payment, t.name AS type, l.interest_rate, l.term, l.monthly_repayment, bb.name AS bank 
    FROM loan AS l 
    INNER JOIN loan_category AS t ON t.id = l.category_id
    INNER JOIN Bank AS bb ON bb.id = l.bank_id 
    WHERE l.user_id = ${req.session.userId} AND l.id = ${id}
    `;

    connection.query(query, (err, loans) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database" + err.message,
            });
            return;
        }
        const loan = loans[0];

        res.status(200).json({ loan });
    });
});

router.post("/", (req, res) => {
    let { name, balance, type, bank } = req.body;
    name = name.replace(/'/g, '"');
    const userId = req.session.userId;
    if (!balance) {
        balance = 0;
    }
    if (!name || !type || !bank) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO loan (name, balance, category_id, bank_id, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [name, balance, type, bank, userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the bank account: ", err.message);
            return res
                .status(500)
                .json({ message: "Error creating the bank." });
        }
        res.status(201).json({ message: "Loan created" });
    });
});

router.put("/", (req, res) => {
    let { name, monthly_repayment, interest_rate } = req.body;
    name = name.replace(/'/g, '"');

    const query = `
        UPDATE loan
        SET monthly_repayment = ${monthly_repayment}, interest_rate = ${interest_rate}
        WHERE user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: `Error updating the loan: ${err.message}`,
            });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "loan not found" });
        }
        res.status(200).json({ message: "Loan updated" });
    });
});

router.delete("/", (req, res) => {
    const { id, userId } = req.body;
    if (!id) {
        return res.status(400).json({ message: "loan ID is required" });
    }

    if (req.userId !== userId) {
        return res
            .status(403)
            .json({ message: "You may not delete this loan" });
    }

    const query = `
        DELETE FROM loan WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: `Error deleting the loan: ${err.message}`,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({ message: "Loan deleted successfully" });
    });
});

router.get("/loan-categories", (req, res) => {
    const query = `
        SELECT id, name FROM Loan_category
    `;
    connection.query(query, (err, results) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error reading from the database" });
        }

        const categories = results.map((cat) => ({
            id: cat.id,
            name: cat.name,
        }));

        res.status(200).json({ loans });
    });
});

module.exports = router;
