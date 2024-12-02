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

//get all folders based on a tag name
router.get("/:name", (req, res) => {
    const { name = null } = req.params;
    const sql =
        "SELECT * FROM Folder as f INNER JOIN Tag as t ON f.tag_id = t.id WHERE t.name LIKE ?";
    connection.query(sql, [`%${name}%`], (err, folders) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching folders",
            });
        }
        res.status(200).json({ folders });
    });
});

module.exports = router;
