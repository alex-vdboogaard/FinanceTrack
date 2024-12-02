const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

const notification = require("./notification");
const credit_score = require("./credit_score");
const task = require("./task");
const reminder = require("./reminder");

router.use(ValidateLoggedIn);

router.use("/notification", notification);
router.use("/credit-score", credit_score);
router.use("/task", task);
router.use("/reminder", reminder);

router.post("/profile-picture", upload)

module.exports = router;
