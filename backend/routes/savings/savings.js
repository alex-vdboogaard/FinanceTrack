const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();
router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const query = `
        SELECT b.id, b.description, b.balance, c.name, bc.name AS bank_name
        FROM bank_account AS b INNER JOIN bank AS bc ON b.bank_id = bc.id
        INNER JOIN bank_account_category AS c ON b.category_id = c.id
        WHERE b.user_id = ${req.session.userId} 
        AND c.name LIKE 'Savings';
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database",
            });
            return;
        }

        const savings = results.map((s) => ({
            id: s.id,
            name: s.description,
            balance: s.balance,
            bank: s.bank_name,
        }));
        res.status(200).json({ savings });
    });
});

module.exports = router;
