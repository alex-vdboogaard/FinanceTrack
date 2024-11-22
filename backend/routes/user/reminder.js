const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

// Get all reminders (with linked tasks, if any)
router.get("/", (req, res) => {
    const query = `
        SELECT r.*, t.id AS task_id, t.title AS task_title
        FROM Reminder r
        LEFT JOIN Task t ON r.id = t.reminder_id
        WHERE t.user_id = ?`;
    connection.query(query, [req.session.userId], (err, reminders) => {
        if (err) {
            return res.status(500).json({
                message: "Error reading from the database" + err.message,
            });
        }
        res.status(200).json({ reminders });
    });
});

// Get a specific reminder by ID (with linked task, if any)
router.get("/:id", (req, res) => {
    const query = `
        SELECT r.*, t.id AS task_id, t.title AS task_title
        FROM Reminder r
        LEFT JOIN Task t ON r.id = t.reminder_id
        WHERE r.id = ? AND r.user_id = ?`;
    connection.query(
        query,
        [req.params.id, req.session.userId],
        (err, reminder) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error reading from the database" });
            }
            if (reminder.length === 0) {
                return res.status(404).json({ message: "Reminder not found" });
            }
            res.status(200).json({ reminder: reminder[0] });
        }
    );
});

// Create a new reminder
router.post("/", (req, res) => {
    const { reminder_date, message } = req.body;
    const query =
        "INSERT INTO Reminder (reminder_date, message, user_id) VALUES (?, ?, ?)";
    connection.query(
        query,
        [reminder_date, message, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error creating the reminder" });
            }
            res.status(201).json({
                message: "Reminder created",
                reminderId: results.insertId,
            });
        }
    );
});

// Update a reminder by ID
router.put("/:id", (req, res) => {
    const { reminder_date, message } = req.body;
    const query = `
        UPDATE Reminder 
        SET reminder_date = ?, message = ?
        WHERE id = ? AND user_id = ?`;
    connection.query(
        query,
        [reminder_date, message, req.params.id, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error updating the reminder" });
            }
            if (results.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Reminder not found or no changes made" });
            }
            res.status(200).json({ message: "Reminder updated" });
        }
    );
});

// Delete a reminder by ID
router.delete("/:id", (req, res) => {
    const deleteQuery = `
        DELETE FROM Reminder 
        WHERE id = ? AND user_id = ?`;
    const nullifyTaskQuery = `
        UPDATE Task 
        SET reminder_id = NULL
        WHERE reminder_id = ? AND user_id = ?`;

    connection.beginTransaction((transactionErr) => {
        if (transactionErr) {
            return res
                .status(500)
                .json({ message: "Error starting the transaction" });
        }

        // Nullify the reminder_id in linked tasks
        connection.query(
            nullifyTaskQuery,
            [req.params.id, req.session.userId],
            (nullifyErr) => {
                if (nullifyErr) {
                    return connection.rollback(() => {
                        res.status(500).json({
                            message: "Error unlinking tasks from the reminder",
                        });
                    });
                }

                // Delete the reminder itself
                connection.query(
                    deleteQuery,
                    [req.params.id, req.session.userId],
                    (deleteErr, results) => {
                        if (deleteErr) {
                            return connection.rollback(() => {
                                res.status(500).json({
                                    message: "Error deleting the reminder",
                                });
                            });
                        }

                        if (results.affectedRows === 0) {
                            return connection.rollback(() => {
                                res.status(404).json({
                                    message: "Reminder not found",
                                });
                            });
                        }

                        connection.commit((commitErr) => {
                            if (commitErr) {
                                return connection.rollback(() => {
                                    res.status(500).json({
                                        message:
                                            "Error committing the transaction",
                                    });
                                });
                            }

                            res.status(200).json({
                                message: "Reminder deleted successfully",
                            });
                        });
                    }
                );
            }
        );
    });
});

module.exports = router;
