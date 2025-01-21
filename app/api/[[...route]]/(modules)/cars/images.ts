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
      }),
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
              },
            )
            .end(buffer);
        });
      });

      try {
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(
          (result: unknown) => (result as UploadApiResponse).secure_url,
        );

        return c.json(
          {
            success: true,
            images: imageUrls,
          },
          200,
        );
      } catch (error) {
        console.error("Upload error:", error);
        return c.json(
          {
            success: false,
            message:
              "Failed to upload images. Please check Cloudinary configuration.",
          },
          500,
        );
      }
    },
  )
  .delete(
    "/:url",
    clerkMiddleware(),
    zValidator("param", z.object({ url: z.string() })),
    zValidator(
      "json",
      z.object({
        carId: z.string(),
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      if (!auth?.userId) {
        return c.json({ success: false, message: "Unauthorized user" }, 401);
      }

      const { url } = c.req.valid("param");
      const { carId } = c.req.valid("json");

      const decodedUrl = decodeURIComponent(url);
      const publicId = decodedUrl
        .split("/")
        .slice(-1)
        .join("")
        .replace(/\.[^/.]+$/, "");

      const deleteFromCloudinaryIfExists = async (publicId: string) => {
        try {
          const success = await deleteFromCloudinary(`car-images/${publicId}`);
          console.log("Cloudinary delete success:", success);
          return success;
        } catch (error) {
          console.error("Failed to delete image from Cloudinary:", error);
          return false;
        }
      };

      const updateDatabaseImages = async (
        carId: string,
        images: string[],
        decodedUrl: string,
      ) => {
        const updatedImages = images.filter((image) => image !== decodedUrl);

        try {
          await db
            .update(cars)
            .set({ images: updatedImages })
            .where(eq(cars.id, carId));
          console.log("Updated image array saved to DB:", updatedImages);
          return true;
        } catch (error) {
          console.error("Failed to update database:", error);
          return false;
        }
      };

      const car = await db.query.cars.findFirst({
        where: eq(cars.id, carId),
      });

      if (!car) {
        return c.json({ success: false, message: "Car not found" }, 404);
      }

      const imageExistsInDb = car.images.includes(decodedUrl);

      const cloudinarySuccess = imageExistsInDb
        ? await deleteFromCloudinaryIfExists(publicId)
        : false;

      if (imageExistsInDb) {
        const dbSuccess = await updateDatabaseImages(
          car.id,
          car.images,
          decodedUrl,
        );

        if (dbSuccess && cloudinarySuccess) {
          return c.json({
            success: true,
            message: "Image deleted from both Cloudinary and database",
          });
        }

        if (dbSuccess && !cloudinarySuccess) {
          return c.json({
            success: true,
            message: "Image deleted from database but not found in Cloudinary",
          });
        }

        return c.json({
          success: false,
          message: "Failed to update database",
        });
      }

      const cloudinaryDeleteOnly = await deleteFromCloudinaryIfExists(publicId);

      return c.json({
        success: cloudinaryDeleteOnly,
        message: cloudinaryDeleteOnly
          ? "Image deleted from Cloudinary but was not in database"
          : "Image was not found in database or Cloudinary",
      });
    },
  );

export default app;
