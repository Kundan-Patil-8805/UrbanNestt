// const cloudinary = require("cloudinary");



// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY ,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


// module.exports.uploadImage = async (req, res) => {
//     try {
//         // Assuming `req.file.path` contains the file path (e.g., from Multer)
//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: "properties", // Specify a folder in Cloudinary
//         });

//         res.status(200).json({
//             message: "Image uploaded successfully!",
//             url: result.secure_url,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to upload image.",
//             error: error.message,
//         });
//     }
// };
