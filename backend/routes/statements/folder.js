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
            f.parent_folder_id,
            t.id AS tag_id,
            t.name AS tag_name,   
            t.colour AS tag_colour   
        FROM Folder f
        LEFT JOIN Statement s ON s.folder_id = f.id
        LEFT JOIN Tag t ON f.tag_id = t.id   -- Join Tag table to get tag details for the folder
        WHERE f.user_id = ? AND f.id = ?
        ORDER BY s.name`;

    // Query to retrieve all subfolders of the current folder
    const subfoldersSql = `
        SELECT 
            f.id, 
            f.name,
            t.id AS tag_id,
            t.name AS tag_name,      
            t.colour AS tag_colour  
        FROM Folder f
        LEFT JOIN Tag t ON f.tag_id = t.id
        WHERE f.user_id = ? AND f.parent_folder_id = ? 
        ORDER BY f.name`;

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

            const {
                folder_id,
                folder_name,
                parent_folder_id,
                tag_id,
                tag_name,
                tag_colour,
            } = statementResults[0];

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
                    const folders = folderResults.map((folder) => ({
                        id: folder.id,
                        name: folder.name,
                        tag: {
                            id: folder.tag_id,
                            name: folder.tag_name,
                            colour: folder.tag_colour,
                        },
                    }));
                    // Build and send the response
                    const data = {
                        folder_id,
                        folder_name,
                        parent_folder_id: parent_folder_id || null,
                        tag: {
                            id: tag_id,
                            name: tag_name,
                            colour: tag_colour,
                        },
                        statements,
                        folders: folders,
                    };

                    res.status(200).json(data);
                }
            );
        }
    );
});

// POST ROUTE for new folder
router.post("/", (req, res) => {
    const { parentFolderId = null, name, tag_id = null } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Please name your new folder" });
    }

    const query = `
            INSERT INTO Folder (name, parent_folder_id, user_id, tag_id) 
            VALUES (?, ?, ?, ?)
        `;

    const values = [name, parentFolderId, req.session.userId, tag_id];

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

// DELETE ROUTE for folders
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
