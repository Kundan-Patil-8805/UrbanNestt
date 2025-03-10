const { v2: cloudinary } = require("cloudinary");
const fs = require("fs/promises"); // Use the promise-based version

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("No file path provided!");

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.url);

    // Remove the local file after successful upload
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading file:", error);

    // Attempt to delete the local file even if the upload fails
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }

    return null;
  }
};

module.exports = { uploadOnCloudinary };
