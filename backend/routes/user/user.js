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

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage }).single("png");

router.put("/profile-picture", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const filePath = req.file.path;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.unlink(filePath, () => {});
      console.error("Error reading file:", err);
      return res
        .status(500)
        .json({ message: "Error processing file", error: err.message });
    }

    const sql = "UPDATE `User` SET profile_image = ? WHERE id = ?";
    connection.query(sql, [data, req.session.userId], (dbErr, result) => {
      fs.unlink(filePath, () => {});

      if (dbErr) {
        console.error("Database error:", dbErr);
        return res.status(500).json({
          message: "Error saving image to the database",
          error: dbErr.message,
        });
      }

      return res.status(200).json({ message: "Profile picture updated" });
    });
  });
});

module.exports = router;
