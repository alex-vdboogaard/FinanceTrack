const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const router = express.Router();
const Asset = require("../models/Asset");

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
        SELECT Asset.id, Asset.name, Asset.boughtFor, Asset.currentValue, Asset_Type.name AS assetType
        FROM Asset
        JOIN Asset_Type ON Asset.asset_type_id = Asset_Type.id
        WHERE Asset.user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const assets = results.map(asset => new Asset(
            asset.id,
            asset.name,
            asset.boughtFor,
            asset.currentValue,
            asset.assetType,
            asset.userId
        ));

        res.status(200).json({ assets });
    });
});

router.post("/", (req, res) => {
    let { name, boughtFor, currentValue, type } = req.body;
    name = name.replace(/'/g, '"');
    const userId = req.session.userId; // Ensure userId is retrieved correctly

    // Check if the required fields are present
    if (!name || !boughtFor || !currentValue || !type || !userId) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Prepare the SQL query with placeholders
    const query = `
        INSERT INTO Asset (name, boughtFor, currentValue, asset_type_id, user_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [name, boughtFor, currentValue, type, userId];

    // Execute the query
    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating the asset: ", err.message); // Log specific error message
            return res.status(500).json({ message: "Error creating the asset." });
        }
        res.status(201).json({ message: "Asset created successfully." });
    });

});

router.put("/", (req, res) => {
    let { name, boughtFor, currentValue, userId, id } = req.body;
    name = name.replace(/'/g, '"');
    if (req.userId !== userId) {
        res.status(403).json({ message: "You may not update this asset" });
    }

    const query = `
        UPDATE Asset
        SET name = '${name}', boughtFor = ${boughtFor}, currentValue = ${currentValue}
        WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error updating the asset: ${err.message}` });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Asset not found" });
        }
        res.status(200).json({ message: "Asset updated successfully" });
    });
});

router.delete("/", (req, res) => {
    const { id, userId } = req.body;

    // Ensure id is defined
    if (!id) {
        return res.status(400).json({ message: "Asset ID is required" });
    }

    if (req.userId !== userId) {
        return res.status(403).json({ message: "You may not delete this asset" });
    }

    const query = `
        DELETE FROM Asset WHERE id = ${id}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: `Error deleting the asset: ${err.message}` });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.status(200).json({ message: "Asset deleted successfully" });
    });
});

router.get("/asset-types", (req, res) => {
    const query = `
        SELECT id, name FROM Asset_Type
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const types = results.map(type => ({
            id: type.id,
            name: type.name
        }));

        res.status(200).json({ types });
    });
});

module.exports = router;
