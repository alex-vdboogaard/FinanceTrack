const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

// Get all tasks
router.get("/", (req, res) => {
    const query = "SELECT * FROM Task WHERE user_id = ?";
    connection.query(query, [req.session.userId], (err, tasks) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error reading from the database" });
        }
        res.status(200).json({ tasks });
    });
});

// Create a new task
router.post("/", (req, res) => {
    const { title, description, link } = req.body;
    const query =
        "INSERT INTO Task (title, description, link, user_id) VALUES (?, ?, ?, ?)";
    connection.query(
        query,
        [title, description, link, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error creating the task" });
            }
            res.status(201).json({
                message: "Task created",
                taskId: results.insertId,
            });
        }
    );
});

// Update a task by ID
router.put("/done", (req, res) => {
    let { id, done } = req.body;
    if (done === 0) {
        done = false;
    } else {
        done = true;
    }
    const query = `
        UPDATE Task 
        SET done = ?
        WHERE id = ? AND user_id = ?`;
    connection.query(query, [done, id, req.session.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error updating the task" });
        }
        if (results.affectedRows === 0) {
            return res
                .status(404)
                .json({ message: "Task not found or no changes made" });
        }
        res.status(200).json({ message: "Task updated" });
    });
});

// Update a task by ID
router.put("/:id", (req, res) => {
    const { title, description, link = "" } = req.body;
    const query = `
        UPDATE Task 
        SET title = ?, description = ?, link = ?
        WHERE id = ? AND user_id = ?`;
    connection.query(
        query,
        [title, description, link, req.params.id, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error updating the task" });
            }
            if (results.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Task not found or no changes made" });
            }
            res.status(200).json({ message: "Task updated" });
        }
    );
});

// Delete a task by ID
router.delete("/:id", (req, res) => {
    const query = "DELETE FROM Task WHERE id = ? AND user_id = ?";
    connection.query(
        query,
        [req.params.id, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error deleting the task" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task deleted" });
        }
    );
});

module.exports = router;
