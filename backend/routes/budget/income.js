const express = require("express");
const connection = require("../../db/db");
const router = express.Router();
router.get("/", (req, res) => {
  const query = `SELECT i.id, i.description, i.amount, t.name AS type FROM Recurring_Income AS i INNER JOIN Income_Category AS t ON t.id = i.category_id WHERE user_id = ?`;

  connection.query(query, [req.session.userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error reading from the database" });
      return;
    }

    const income = results.map((income) => ({
      id: income.id,
      name: income.description,
      amount: income.amount,
      type: income.type,
    }));

    res.status(200).json({ income });
  });
});

router.post("/", (req, res) => {
  const { description, amount, categoryId } = req.body;
  const query = `INSERT INTO Recurring_Income (user_id, description, amount, category_id) VALUES (?, ?, ?, ?)`;

  connection.query(
    query,
    [req.session.userId, description, amount, categoryId],
    (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: `Error writing to the database: ${err.message}` });
        return;
      }

      res.status(201).json({ message: "Income created successfully" });
    }
  );
});

router.put("/", (req, res) => {
  const { id, name, amount } = req.body;
  const query = `UPDATE Recurring_Income SET description = ?, amount = ? WHERE id = ? AND user_id = ?`;

  connection.query(
    query,
    [name, amount, id, req.session.userId],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error updating the database" });
        return;
      }

      res.status(200).json({ message: "Income updated successfully" });
    }
  );
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  const query = `DELETE FROM Recurring_Income WHERE id = ? AND user_id = ?`;

  connection.query(query, [id, req.session.userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error deleting from the database" });
      return;
    }

    res.status(200).json({ message: "Income deleted successfully" });
  });
});

router.get("/income-categories", (req, res) => {
  const query = `SELECT * FROM Income_Category`;

  connection.query(query, [req.session.userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error reading from the database" });
      return;
    }

    const types = results.map((type) => ({
      id: type.id,
      name: type.name,
    }));

    res.status(200).json({ types });
  });
});

module.exports = router;
