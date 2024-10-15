const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const BankAccount = require('../models/BankAccount');
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `
        SELECT id, name, goal, balance FROM saving_goal WHERE user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const savingGoals = results.map(s => ({
            id: s.id,
            name: s.name,
            balance: s.balance,
            goal: s.goal
        }));


        res.status(200).json({ savingGoals });
    });
});

router.post("/goal", (req, res) => {
    let { name, goal, balance = 0 } = req.body;

    name = name.replace(/'/g, '"');
    const userId = req.session.userId;

    if (!name || !goal || !userId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO saving_goal (name, goal, balance, user_id) 
        VALUES (${name}, ${goal}, ${balance}, ${userId})
    `;

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the bank account: ", err.message);
            return res.status(500).json({ message: "Error creating the bank." });
        }
        res.status(201).json({ message: "Saving goal created" });
    });

});

router.put("/goal", (req, res) => {
    let { id, name, goal, balance = 0 } = req.body;
    name = name.replace(/'/g, '"');
    const query = `
        UPDATE saving_goal SET name = '${name}', goal=${goal}, balance=balance+${balance} WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error updating the saving goal: ${err.message}` });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "saving goal not found" });
        }
        res.status(200).json({ message: "Saving goal updated" });
    });
});

router.delete("/goal", (req, res) => {
    const { id, userId } = req.body;
    if (!id) {
        return res.status(400).json({ message: "saving goal ID is required" });
    }

    if (req.session.userId !== userId) {
        return res.status(403).json({ message: "You may not delete this saving goal" });
    }


    const query = `
        DELETE FROM saving_goal WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error deleting the bank account: ${err.message}` });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bank account not found" });
        }

        res.status(200).json({ message: "Saving goal deleted successfully" });
    });
});

module.exports = router;
