const express = require("express");
const connection = require("../../db/db");
const router = express.Router();

// get all past tax period payments
router.get("/", (req, res) => {
    const query = "SELECT * FROM Tax_period WHERE user_id = ?";
    connection.query(query, [req.session.userId], (err, tax_payments) => {
        if (err) {
            return res
            .status(500)
            .json({message: "Error reading from the database"});
        }
        res.status(200).json({tax_payments});
    });
});

// add a new tax period payment
router.post("/", (req, res) => {
    const { amount, year} = req.body;
    const query = "INSERT INTO Tax_period (amount, year, user_id) VALUES (?,?,?)";
    connection.query(
        query,
        [amount, year, req.session.userId],
        (err, results) =>{
            if (err) {
                return res.status(500).json({message: "Error adding tax period payment"});
            }
            res.status(201).json({
                message: "Tax payment added",
                paymentId: results.insertId,
            });
        }
    );
});

//get all tfsa contributions
router.get("/tfsa-contribution", (req,res) => {
    const query = "SELECT * FROM TFSA_contribution WHERE user_id = ?";
    connection.query(query, [req.session.userId], (err, contributions) => {
        if (err){
            return res
                .status(500)
                .json({message: "Error reading from the database"});
        }
        res.status(200).json({contributions})
    });
});

//add new tfsa contribution
router.post("/tfsa-contribution", (req, res) => {
    const {amount, month, year} = req.body;
    const query = 
    "INSERT INTO TFSA_contribution (amount, month, year, user_id) VALUES (?,?,?,?)";
    connection.query(
        query,
        [amount, month, year, req.session.userId],
        (err, results) => {
            if (err) {
                return res
                .status(500)
                .json({message: "Error adding the tax-free savings account contribution"});
            }
            res.status(201).json({
                message: "Tax-free savings account contribution added.",
                contributionId: results.insertId,
            });
        }
    );
});

module.exports = router;
