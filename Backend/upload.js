const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: "uploads/", // Folder to store images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Upload Image API
router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` }); // Store relative path
});

module.exports = router;