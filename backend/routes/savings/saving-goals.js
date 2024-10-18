const express = require('express');
const ValidateLoggedIn = require('../../middleware/ValidateLoggedIn');
const connection = require("../../db/db");
const router = express.Router();
router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `
        SELECT id, name, goal, balance, user_id FROM saving_goal WHERE user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const goals = results.map(s => ({
            id: s.id,
            name: s.name,
            balance: s.balance,
            goal: s.goal,
            userId: s.user_id
        }));
        res.status(200).json({ goals });
    });
});

router.post("/", (req, res) => {
    let { name, goal, balance = 0 } = req.body;

    name = name.replace(/'/g, '"');
    if (!name || !goal) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const query = `
        INSERT INTO saving_goal (name, goal, balance, user_id) 
        VALUES ('${name}', ${goal}, ${balance}, ${req.session.userId})
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error creating the saving goal." });
        }
        res.status(201).json({ message: "Saving goal created" });
    });

});

router.put("/", (req, res) => {
    let { id, goal, balance, userId } = req.body;

    balance = Math.floor(parseFloat(balance));
    goal = Math.floor(parseFloat(goal));

    // Check for required fields
    if (!id || !balance || !goal || !userId) {
        return res.status(401).json({ message: "All fields required" }); // Return immediately
    }

    // Check user authorization
    if (userId !== req.session.userId) {
        return res.status(403).json({ message: "You may not update this goal" }); // Return immediately
    }

    // Check if the deposit amount exceeds the remaining goal
    if (goal < balance) {
        return res.status(403).json({ message: "Deposit amount can't exceed remaining balance" }); // Return immediately
    }

    // Proceed with the update query
    const query = `UPDATE saving_goal SET balance = ? WHERE id = ?`;

    connection.query(query, [balance, id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error updating the saving goal: ${err.message}` });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Saving goal not found" });
        }
        res.status(200).json({ message: "Saving goal updated" });
    });
});

router.delete("/", (req, res) => {
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
            return res.status(500).json({ message: `Error deleting the saving goal: ${err.message}` });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Saving goal not found" });
        }

        res.status(200).json({ message: "Saving goal deleted successfully" });
    });
});

module.exports = router;