const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const router = express.Router();
const Investment = require("../models/Investment");

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
        SELECT Investment.id, Investment.description, Investment.invested, Investment.user_id, Investment.currentValue, Investment_Category.name AS type
        FROM Investment
        JOIN Investment_Category ON Investment.category_id = Investment_Category.id
        WHERE Investment.user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const investments = results.map(investment => new Investment(
            investment.id,
            investment.description,
            investment.invested,
            investment.currentValue,
            investment.type,
            investment.user_id
        ));

        res.status(200).json({ investments });
    });
});

router.post("/", (req, res) => {
    let { description, invested, currentValue, type } = req.body;
    description = description.replace(/'/g, '"');
    const userId = req.session.userId;

    if (!description || !invested || !currentValue || !type || !userId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO Investment (description, invested, currentValue, category_id, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [description, invested, currentValue, type, userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the investment: ", err.message);
            return res.status(500).json({ message: "Error creating the investment." });
        }
        res.status(201).json({ message: "Investment created successfully." });
    });

});

router.put("/", (req, res) => {
    let { description, invested, currentValue, user_id, id } = req.body;
    description = description.replace(/'/g, '"');

    if (req.userId !== user_id) {
        res.status(403).json({ message: "You may not update this investment" });
    }

    const query = `
        UPDATE Investment
        SET description = '${description}', invested = ${invested}, currentValue = ${currentValue}
        WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error updating the investment: ${err.message}` });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Investment not found" });
        }
        res.status(200).json({ message: "Investment updated successfully" });
    });
});

router.delete("/", (req, res) => {
    const { id, user_id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Investment ID is required" });
    }

    if (req.userId !== user_id) {
        return res.status(403).json({ message: "You may not delete this investment" });
    }

    const query = `
        DELETE FROM Investment WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error deleting the investment: ${err.message}` });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Investment not found" });
        }

        res.status(200).json({ message: "Investment deleted successfully" });
    });
});

router.get("/investment-types", (req, res) => {
    const query = `
        SELECT id, name FROM Investment_Category
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
