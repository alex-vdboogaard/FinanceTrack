const express = require("express");
const ValidateLoggedIn = require("../middleware/ValidateLoggedIn");
const connection = require("../db/db");
const BankAccount = require("../models/BankAccount");
const router = express.Router();

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
  const query = `
    SELECT b.id, b.description, b.balance, t.name AS type, bb.name AS bank 
    FROM bank_account AS b 
    INNER JOIN bank_account_category AS t ON t.id = b.category_id
    INNER JOIN Bank AS bb ON bb.id = b.bank_id 
    WHERE b.user_id = ${req.session.userId}
    `;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({
        message: "Error reading from the database",
      });
      return;
    }

    const bankAccounts = results.map(
      (bankAccount) =>
        new BankAccount(
          bankAccount.id,
          bankAccount.description,
          bankAccount.balance,
          bankAccount.type,
          bankAccount.bank
        )
    );

    res.status(200).json({ bankAccounts });
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
        INSERT INTO bank_account (description, balance, category_id, bank_id, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

  const values = [name, balance, type, bank, userId];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error creating the bank account: ", err.message);
      return res.status(500).json({ message: "Error creating the bank." });
    }
    res.status(201).json({ message: "Bank account created" });
  });
});

router.put("/", (req, res) => {
  let { id, name, balance } = req.body;
  name = name.replace(/'/g, '"');

  const query = `
        UPDATE bank_account
        SET description = '${name}', balance = ${balance}
        WHERE id = ${id} AND user_id = ${req.session.userId}
    `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Error updating the bank account: ${err.message}`,
      });
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
    return res
      .status(403)
      .json({ message: "You may not delete this bank account" });
  }

  const query = `
        DELETE FROM bank_account WHERE id = ${id}
    `;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: `Error deleting the bank account: ${err.message}`,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    res.status(200).json({ message: "Bank account deleted successfully" });
  });
});

router.get("/bank-types", (req, res) => {
  const query = `
        SELECT id, name FROM bank_account_category
    `;
  connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading from the database" });
    }

    const types = results.map((type) => ({
      id: type.id,
      name: type.name,
    }));

    res.status(200).json({ types });
  });
});

router.get("/banks", (req, res) => {
  const query = `
        SELECT id, name FROM bank
    `;
  connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading from the database" });
    }

    const banks = results.map((bank) => ({
      id: bank.id,
      name: bank.name,
    }));

    res.status(200).json({ banks });
  });
});

module.exports = router;
