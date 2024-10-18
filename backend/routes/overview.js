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
    console.log(req.session.userId);

    try {
        //get assets
        let query = `SELECT a.name, a.boughtFor, a.currentValue, c.name AS type FROM asset AS a INNER JOIN asset_type AS c ON a.asset_type_id = c.id`;
        const [assetResults] = await connection.promise().query(query);

        const assets = assetResults.map(a => new Asset(
            a.id,
            a.name,
            a.boughtFor,
            a.currentValue,
            a.type
        ));

        data.assets = assets;

        // Get investments
        query = `
        SELECT Investment.id, Investment.description, Investment.invested, Investment.user_id, Investment.currentValue, Investment_Category.name AS type
        FROM Investment
        JOIN Investment_Category ON Investment.category_id = Investment_Category.id
        WHERE Investment.user_id = ${req.session.userId}
    `;
        const [investmentsResults] = await connection.promise().query(query);

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
                 WHERE b.user_id = ${req.session.userId}`;
        const [bankAccountsResults] = await connection.promise().query(query);

        const bankAccounts = bankAccountsResults.map(a => new BankAccount(
            a.id,
            a.description,
            a.balance,
            a.type
        ));

        data.bankAccounts = bankAccounts;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error reading from the database", err });
    }
});

module.exports = router;
