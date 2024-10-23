const express = require('express');
const ValidateLoggedIn = require('../../middleware/ValidateLoggedIn');
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

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




module.exports = router;
