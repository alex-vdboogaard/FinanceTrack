const express = require("express");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

const notification = require("./notification");
const credit_score = require("./credit_score");
const task = require("./task");

router.use("/notification", notification);
router.use("/credit-score", credit_score);
router.use("/task", task);

router.use(ValidateLoggedIn);

module.exports = router;
