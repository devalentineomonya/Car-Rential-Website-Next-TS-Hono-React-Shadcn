import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Hono } from "hono";
import { z } from "zod";

import { deleteFromCloudinary } from "@/lib/file";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing required Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = new Hono()
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "form",
      z.object({
        images: z.array(z.instanceof(File)),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const body = c.req.valid("form");
      const uploadPromises = body.images.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "car-images",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            )
            .end(buffer);
        });
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(
          (result: unknown) => (result as UploadApiResponse).secure_url
        );

        return c.json(
          {
            success: true,
            images: imageUrls,
          },
          200
        );
      } catch (error) {
        console.error("Upload error:", error);
        return c.json(
          {
            success: false,
            message:
              "Failed to upload images. Please check Cloudinary configuration.",
          },
          500
        );
      }
    }
  )
  .delete(
    "/:imageName",
    clerkMiddleware(),
    zValidator("param", z.object({ imageName: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const {imageName} = c.req.valid("param")
      const response = await deleteFromCloudinary(`car-images/${imageName}`)
     if(!response){
        return c.json({success:true, message:"Failed to delete image"}, 400)
     }
      return c.json({success:true, data:response},200)
    }
  );

export default app;
