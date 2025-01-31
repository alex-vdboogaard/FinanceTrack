const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ValidateLoggedIn = require("../../middleware/ValidateLoggedIn");
const connection = require("../../db/db");
const router = express.Router();

router.use(ValidateLoggedIn);

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

// GET route to retrieve the user's profile photo
router.get("/", (req, res) => {
  const sql = "SELECT profile_photo FROM `User` WHERE id = ?";

  connection.query(sql, [req.session.userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0 || !results[0].profile_photo) {
      return res.status(404).json({ message: "No profile picture found" });
    }

    const imageBuffer = results[0].profile_photo;
    const base64Image = imageBuffer.toString("base64");
    const imageSrc = `data:image/png;base64,${base64Image}`;

    res.json({ image: imageSrc }); // Send the image as a Base64 string
  });
});

// POST route to upload and save a new profile photo
router.post("/", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No picture uploaded" });
  }

  const file = req.file;
  fs.readFile(file.path, (err, data) => {
    if (err) {
      fs.unlink(file.path, () => {}); // Remove file if there's an error
      return res.status(500).json({ message: "Error reading photo" });
    }

    const sql = "UPDATE `User` SET profile_photo = ? WHERE id = ?";
    connection.query(sql, [data, req.session.userId], (err, result) => {
      fs.unlink(file.path, () => {}); // Remove the uploaded file after saving

      if (err) {
        return res.status(500).json({ message: "Error saving photo" });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Photo not updated" });
      }

      res.status(200).json({ message: "Profile photo updated successfully" });
    });
  });
});

module.exports = router;
