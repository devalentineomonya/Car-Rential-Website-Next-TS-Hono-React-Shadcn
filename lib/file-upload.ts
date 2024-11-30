import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("cloudinary name", process.env.CLOUDINARY_CLOUD_NAME);
console.log("cloudinary key", process.env.CLOUDINARY_API_KEY);
console.log("cloudinary secret", process.env.CLOUDINARY_API_SECRET);
export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder: "cars",
    });
    console.log("Cloudinary upload response:", response);
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
