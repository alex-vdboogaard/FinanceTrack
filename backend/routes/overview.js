const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const router = express.Router();
const Asset = require("../models/Asset");
const Investment = require("../models/Investment");
const BankAccount = require("../models/BankAccount");

router.use(ValidateLoggedIn);

router.get("/", async (req, res) => {
    const data = {};
    try {
        // Get investments
        let query = `SELECT i.id, i.description, i.invested, i.currentValue, c.name as type 
                     FROM investment as i 
                     INNER JOIN investment_category as c ON i.category_id = c.id 
                     WHERE i.user_id = ?`;
        const [investmentsResults] = await connection.promise().query(query, [req.userId]);

        const investments = investmentsResults.map(i => new Investment(
            i.id,
            i.description,
            i.invested,
            i.currentValue,
            i.type
        ));

        data.investments = investments;

        // Get bank accounts
        query = `SELECT b.id, b.description, b.balance, c.name as type 
                 FROM bank_account as b 
                 INNER JOIN bank_account_category as c ON b.category_id = c.id 
                 WHERE b.user_id = ?`;
        const [bankAccountsResults] = await connection.promise().query(query, [req.userId]);

        const bankAccounts = bankAccountsResults.map(a => new BankAccount(
            a.id,
            a.description,
            a.balance,
            a.type
        ));

        data.bankAccounts = bankAccounts;

        // Get net worth (sum of investments currentValue, bankAccounts balance, assets currentValue)
        query = `SELECT SUM(i.currentValue) AS investments, 
                        SUM(b.balance) AS bankAccounts, 
                        SUM(a.currentValue) AS assets 
                 FROM bank_account AS b 
                 INNER JOIN investment AS i ON b.user_id = i.user_id 
                 INNER JOIN asset AS a ON i.user_id = a.user_id 
                 WHERE b.user_id = ?`;
        const [netWorthResults] = await connection.promise().query(query, [req.userId]);

        const netWorth = {
            total: (netWorthResults[0].assets + netWorthResults[0].investments + netWorthResults[0].bankAccounts)
        };

        data.netWorth = netWorth;

        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ message: "Error reading from the database", err });
    }
});


// router.get("/", (req, res) => {
//     const data = {};

//     //get investments
//     let query = `SELECT i.id, i.description, i.invested, i.currentValue, c.name as type FROM investments as i INNER JOIN investment_categories as c WHERE user_id = ${req.userId}`;
//     connection.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ message: "Error reading from investments table" });
//             return;
//         }

//         const investments = results.map(i => new Investment(
//             i.id,
//             i.description,
//             i.invested,
//             i.currentValue,
//             i.type
//         ));

//         data.investments = investments;
//     });
//     //get bank accounts
//     query = `SELECT b.id, b.name, b.balance, c.name as type FROM bank_accounts as b INNER JOIN bank_account_categories as c WHERE user_id = ${req.userId}`;
//     connection.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ message: "Error reading from the database" });
//             return;
//         }

//         const bankAccounts = results.map(a => new BankAccount(
//             a.id,
//             a.name,
//             a.balance,
//             a.type
//         ));

//         data.bankAccounts = bankAccounts;
//     });

//     //get net worth
//     //sum of investments currentValue, bankAccounts balance, assets currentValue
//     query = `SELECT SUM(i.currentValue) AS investments, SUM(b.balance) AS bankAccounts, SUM(a.currentValue) AS assets FROM bank_accounts AS b INNER JOIN investments AS i ON b.user_id = i.user_id INNER JOIN assets AS a ON i.user_id = a.user_id WHERE b.user_id = ${req.userId} `;
//     connection.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ message: "Error reading from the database" });
//             return;
//         }

//         const netWorth = results.map(r => ({
//             total:(r.assets + r.investments + r.bankAccounts)
//         }));

//         data.netWorth = netWorth;
//     });

//     res.status(200).json({ data });
// });

module.exports = router;
