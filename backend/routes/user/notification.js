const express = require("express");
const connection = require("../../db/db");
const router = express.Router();

router.get("/", async (req, res) => {
    const query = `SELECT * FROM Notification WHERE user_id = ${req.session.userId}`;
    connection.query(query, (err, notifications) => {
        if (err) {
            res.status(500).json({
                message: "Error reading from the database",
            });
            return;
        }

        res.status(200).json({ notifications });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Notification WHERE id = ${id} AND user_id = ${req.session.userId}`;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error deleting notification" + err.message,
            });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification successfully deleted" });
    });
});

router.delete("/all", (req, res) => {
    const query = `DELETE FROM Notification WHERE user_id = ${req.session.userId}`;
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Error deleting notifications",
            });
            return;
        }

        res.status(200).json({ message: "Notifications successfully deleted" });
    });
});

module.exports = router;
