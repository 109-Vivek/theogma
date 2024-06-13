const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Function to upload a file on Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!fs.existsSync(localFilePath)) { // Check if file exists
      throw new Error("File not found");
    }

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the resource type
    });

    // Delete the file from local storage
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    return response.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadOnCloudinary };
