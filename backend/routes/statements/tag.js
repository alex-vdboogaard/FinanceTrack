const express = require("express");
const connection = require("../../db/db");
const router = express.Router();

//get all tags for a dropdown
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Tag";
    connection.query(sql, (err, tags) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching tags.",
            });
        }
        res.status(200).json({ tags });
    });
});

// Get all folders based on a tag name
router.get("/:name", (req, res) => {
    const { name = null } = req.params;
    const sql = `
        SELECT 
            f.id AS folder_id,
            f.name AS folder_name, 
            f.parent_folder_id,
            t.id AS tag_id,
            t.name AS tag_name,
            t.colour AS tag_colour
        FROM Folder f
        INNER JOIN Tag t ON f.tag_id = t.id
        WHERE t.name LIKE ?`;

    connection.query(sql, [`%${name}%`], (err, folders) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching folders",
            });
        }

        // Format the folders data to include the tag as its own object
        const formattedFolders = folders.map((folder) => ({
            folder_id: folder.folder_id,
            folder_name: folder.folder_name,
            parent_folder_id: folder.parent_folder_id,
            tag: {
                id: folder.tag_id,
                name: folder.tag_name,
                colour: folder.tag_colour,
            },
        }));

        res.status(200).json({ folders: formattedFolders });
    });
});

module.exports = router;
