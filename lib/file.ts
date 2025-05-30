import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary.
 * @param {string} filePath - The path of the file to upload.
 * @returns {Promise<string>} The secure URL of the uploaded image.
 */
export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: "cars",
    });

    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

/**
 * Deletes an image from Cloudinary.
 * @param {string} publicId - The public ID of the image to delete.
 * @returns {Promise<object>} The response from Cloudinary.
 */
export const deleteFromCloudinary = async (
  publicId: string,
): Promise<boolean> => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
