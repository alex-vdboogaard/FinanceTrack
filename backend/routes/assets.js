const express = require('express');
const ValidateLoggedIn = require('../middleware/ValidateLoggedIn');
const connection = require("../db/db");
const router = express.Router();
const Asset = require("../models/Asset");

router.use(ValidateLoggedIn);

router.get("/", (req, res) => {
    const query = `
        SELECT Asset.name, Asset.boughtFor, Asset.currentValue, Asset_Type.name AS assetType
        FROM Asset
        JOIN Asset_Type ON Asset.asset_type_id = Asset_Type.id
        WHERE Asset.user_id = ${req.session.userId}
    `;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error reading from the database" });
            return;
        }

        const assets = results.map(asset => ({
            name: asset.name,
            boughtFor: asset.boughtFor,
            currentValue: asset.currentValue,
            assetType: asset.assetType
        }));

        res.status(200).json({ assets });
    });
});


module.exports = router;
