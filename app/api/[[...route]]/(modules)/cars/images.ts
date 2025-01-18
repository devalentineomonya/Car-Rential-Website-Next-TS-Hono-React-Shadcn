import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { db } from "@/db/drizzle";
import { cars } from "@/db/models/cars";
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
    "/:publicId",
    clerkMiddleware(),
    zValidator("param", z.object({ publicId: z.string() })),
    zValidator("json", z.object({ carId: z.string() })),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const { publicId } = c.req.valid("param");
      const { carId } = c.req.valid("json");

      // Ensure the car exists
      const car = await db.query.cars.findFirst({
        where: eq(cars.id, carId),
      });

      if (!car) {
        return c.json({ success: false, message: "Car not found" }, 404);
      }

      try {
        // Attempt to delete the image from Cloudinary
        const response = await deleteFromCloudinary(`car-images/${publicId}`);
        if (!response) {
          return c.json(
            {
              success: false,
              message: "Failed to delete image from Cloudinary",
            },
            400
          );
        }

        return c.json({ success: true, data: response }, 200);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while deleting image";
        return c.json(
          {
            success: false,
            message: "An error occurred while deleting the image",
            error: errorMessage,
          },
          500
        );
      }
    }
  );

export default app;
