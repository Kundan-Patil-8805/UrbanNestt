const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the temporary directory exists
const tempDir = path.join(__dirname, "public", "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Temp storage location
  },
  filename: (req, file, cb) => {
    // Use a timestamp and original name for uniqueness
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Restrict file types (e.g., allow only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter, // Add the file type filter
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});

module.exports = upload;
