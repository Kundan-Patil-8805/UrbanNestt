// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary");

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "properties", 
//         allowed_formats: ["jpg", "png", "jpeg"], 
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");

// Use memory storage for multer
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;