const express = require("express");
const connection = require("../../db/db");
const router = express.Router();

// GET route to retrieve all statements and subfolders in a folder
router.get("/:id", (req, res) => {
    const { id } = req.params;

    // Query to retrieve folder details and statements in the folder
    const statementSql = `
        SELECT 
            s.id AS statement_id, 
            s.name AS statement_name, 
            s.pdf_blob, 
            f.id AS folder_id,
            f.name AS folder_name, 
            f.parent_folder_id 
        FROM Folder f
        LEFT JOIN Statement s ON s.folder_id = f.id
        WHERE f.user_id = ? AND f.id = ?
        ORDER BY s.name`;

    // Query to retrieve all subfolders of the current folder
    const subfoldersSql = `
        SELECT 
            id, 
            name 
        FROM Folder 
        WHERE user_id = ? AND parent_folder_id = ? 
        ORDER BY name`;

    // Execute both queries sequentially
    connection.query(
        statementSql,
        [req.session.userId, id],
        (err, statementResults) => {
            if (err) {
                return res.status(500).json({
                    message: "An error occurred.",
                    error: err.message,
                });
            }

            // If no folder is found, return 404
            if (statementResults.length === 0) {
                return res.status(404).json({
                    message: "Folder not found or no statements available.",
                });
            }

            const { folder_id, folder_name, parent_folder_id } =
                statementResults[0];

            const statements = statementResults
                .filter((row) => row.statement_id) // Only include rows with valid statements
                .map((row) => ({
                    id: row.statement_id,
                    name: row.statement_name,
                    base64Pdf: row.pdf_blob
                        ? row.pdf_blob.toString("base64")
                        : null,
                }));

            // Fetch subfolders
            connection.query(
                subfoldersSql,
                [req.session.userId, id],
                (err, folderResults) => {
                    if (err) {
                        return res.status(500).json({
                            message: "An error occurred.",
                            error: err.message,
                        });
                    }

                    // Build and send the response
                    const data = {
                        folder_id,
                        folder_name,
                        parent_folder_id: parent_folder_id || null,
                        statements,
                        folders: folderResults,
                    };

                    res.status(200).json(data);
                }
            );
        }
    );
});

// POST ROUTE for new folder
router.post("/", (req, res) => {
    const { parentFolderId = null, name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Please name your new folder" });
    }

    const query = `
            INSERT INTO Folder (name, parent_folder_id, user_id) 
            VALUES (?, ?, ?)
        `;

    const values = [name, parentFolderId, req.session.userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the folder: ", err.message);
            return res
                .status(500)
                .json({ message: "Error creating the folder." });
        }
        res.status(201).json({ message: "Folder created successfully." });
    });
});

// Delete ROUTE for folders
router.delete("/", (req, res) => {
    const { id } = req.body;
    const idInt = +id; // Converts id to an integer
    const query = `
            DELETE FROM Folder WHERE id = ? AND user_id = ?`;

    const values = [idInt, req.session.userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error deleting the folder: ", err.message);
            return res
                .status(500)
                .json({ message: "Error deleting the folder." });
        }
        res.status(201).json({ message: "Folder deleted" });
    });
});

// PUT ROUTE for folders
router.put("/", (req, res) => {
    const { id, name } = req.body;

    if (!name || !id) {
        res.status(400).json({ message: "Please provide all details" });
    }

    const query = `
            UPDATE Folder SET name = ? WHERE id = ? AND user_id = ?`;

    const values = [name, id, req.session.userId];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error editing the folder: ", err.message);
            return res
                .status(500)
                .json({ message: "Error editing the folder." });
        }
        res.status(201).json({ message: "Folder updated" });
    });
});

module.exports = router;
