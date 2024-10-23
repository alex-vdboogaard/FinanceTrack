const express = require('express');
const ValidateLoggedIn = require('../../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
        SELECT * FROM Budget WHERE user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const budget = results.map(budget => {
            id: budget.id;
            income: budget.income;
            expenses: budget.expenses;
            savings: budget.savings;
            invest: budget.invest;
            other: budget.other;
        });

        res.status(200).json({ budget });
    });
});


module.exports = router;
