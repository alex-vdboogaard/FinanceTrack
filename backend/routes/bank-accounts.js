const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const BankAccount = require('../models/BankAccount');
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
        SELECT b.id, b.description, b.balance, t.name AS type FROM bank_account AS b INNER JOIN bank_account_category AS t ON t.id = b.category_id
        WHERE b.user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const bankAccounts = results.map(bankAccount => new BankAccount(
            bankAccount.id,
            bankAccount.description,
            bankAccount.balance,
            bankAccount.type
        ));

        res.status(200).json({ bankAccounts });
    });
});

router.post("/", (req, res) => {
    const { name, balance, type } = req.body;
    const userId = req.session.userId;

    if (!name || !boughtFor || !currentValue || !type || !userId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO bank_account (name, balance, category_id, user_id) 
        VALUES (?, ?, ?, ?)
    `;

    const values = [name, balance, type, userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the bank account: ", err.message);
            return res.status(500).json({ message: "Error creating the bank." });
        }
        res.status(201).json({ message: "Bank account created" });
    });

});

router.put("/", (req, res) => {
    const { id, name, balance, type } = req.body;

    const query = `
        UPDATE bank_account
        SET name = '${name}', balance = ${balance}, category_id = ${type}
        WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error updating the bank account: ${err.message}` });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "bank account not found" });
        }
        res.status(200).json({ message: "Bank account updated" });
    });
});

router.delete("/", (req, res) => {
    const { id, userId } = req.body;
    if (!id) {
        return res.status(400).json({ message: "banks ID is required" });
    }

    if (req.userId !== userId) {
        return res.status(403).json({ message: "You may not delete this banks" });
    }

    const query = `
        DELETE FROM bank_account WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error deleting the bank account: ${err.message}` });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "bank account not found" });
        }

        res.status(200).json({ message: "bank account deleted successfully" });
    });
});

router.get("/bank-types", (req, res) => {
    const query = `
        SELECT id, name FROM bank_account_category
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const types = results.map(type => ({
            id: type.id,
            name: type.name
        }));


        res.status(200).json({ types });
    });
});

module.exports = router;
