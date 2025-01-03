const express = require("express");
const connection = require("../../db/db");
const router = express.Router();

// get all past tax item
router.get("/", (req, res) => {
  const query = "SELECT * FROM Tax_Line_Item WHERE user_id = ?";
  connection.query(query, [req.session.userId], (err, items) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading from the database" });
    }
    res.status(200).json({ items });
  });
});

// add a new tax item
router.post("/", (req, res) => {
  const { amount, year } = req.body;
  const query = "INSERT INTO Tax_period (amount, year, user_id) VALUES (?,?,?)";
  connection.query(
    query,
    [amount, year, req.session.userId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error adding tax period payment" });
      }
      res.status(201).json({
        message: "Tax payment added",
        paymentId: results.insertId,
      });
    }
  );
});

//delete tax item
router.delete("/", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM Tax_Line_Item WHERE id = ? AND user_id = ?";
  connection.query(query, [id, req.session.userId], (err, affected) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting from the database" });
    }
    if (affected.length === 0) {
      res.status(400).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted" });
  });
});

//get all tfsa contributions
router.get("/tfsa-contribution", (req, res) => {
  const query = "SELECT * FROM TFSA_contribution WHERE user_id = ?";
  connection.query(query, [req.session.userId], (err, contributions) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading from the database" });
    }
    res.status(200).json({ contributions });
  });
});

//add new tfsa contribution
router.post("/tfsa-contribution", (req, res) => {
  const { amount, month, year } = req.body;
  const query =
    "INSERT INTO TFSA_contribution (amount, month, year, user_id) VALUES (?,?,?,?)";
  connection.query(
    query,
    [amount, month, year, req.session.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error adding the tax-free savings account contribution",
        });
      }
      res.status(201).json({
        message: "Tax-free savings account contribution added.",
        contributionId: results.insertId,
      });
    }
  );
});

//edit tfsa contribution
router.put("/tfsa-contribution", (req, res) => {
  const { id, amount, month, year } = req.body;
  const query =
    "UPDATE TFSA_contribution SET amount = ?, month = ?, year = ? WHERE id = ? AND user_id = ?";
  connection.query(
    query,
    [amount, month, year, id, req.session.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating the TFSA contribution",
        });
      }
      res.status(201).json({
        message: "TFSA contribution added.",
        contributionId: results.insertId,
      });
    }
  );
});

module.exports = router;
