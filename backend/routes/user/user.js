const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

const notification = require("./notification");
const credit_score = require("./credit_score");
const task = require("./task");
const reminder = require("./reminder");
const profile_photo = require("./profile-photo");

router.use(ValidateLoggedIn);

router.use("/notification", notification);
router.use("/credit-score", credit_score);
router.use("/task", task);
router.use("/reminder", reminder);
router.use("/profile-photo", profile_photo);

router.get("/", async (req, res) => {
  const sql = "SELECT * FROM `User` WHERE id = ? LIMIT 1";
  connection.query(sql, [req.session.userId], (error, results) => {
    if (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error getting user details" });
    }
    const user = results[0];
    res.status(200).json({ user });
  });
});

router.get("/fullname", (req, res) => {
  const sql =
    "SELECT CONCAT(first_name, ' ', last_name) AS fullname FROM `User` WHERE id = ?";
  connection.query(sql, [req.session.userId], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error fetching user details" });
    }
    if (results.length === 0) {
      res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ fullname: results[0].fullname });
  });
});

module.exports = router;
