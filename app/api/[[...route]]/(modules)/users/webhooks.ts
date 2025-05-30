import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { createUser } from "./users";

const app = new Hono().post("/", async (c) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    return c.json(
      {
        success: false,
        message:
          "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
      },
      500,
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return c.json(
      { success: false, message: "Error: Missing Svix headers" },
      400,
    );
  }

  const payload = await c.req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return c.json(
      { success: false, message: "Error: Verification error" },
      400,
    );
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(
    `Received webhook with ID ${id} and event type of ${eventType}`,
    payload,
    "emailAddresses",
    payload.email_addresses,
  );

  if (eventType === "user.created") {
    try {
      const userData = {
        id: createId(),
        clerk_id: payload.data.id as string,
        firstName: payload.data.first_name || (null as string | null),
        lastName: payload.data.last_name || (null as string | null),
        email:
          payload.data.email_addresses?.[0]?.email_address ||
          (null as string | null),
        isNew: true,
        location: null,
        address: null,
        phone: null,
      };
      const existingUser = await db.query.users.findFirst({
        where: eq(users.clerk_id, payload.data.id as string),
      });

      if (existingUser) {
        return c.json({ success: true, data: existingUser }, 200);
      }

      const data = await createUser(userData);

      if (!data.success) {
        console.error("Database error:", data.error);
        throw new Error("Error creating user in DB");
      }

      const client = await clerkClient();
      await client.users.updateUserMetadata(payload.data.id, {
        publicMetadata: {
          isNew: data.data?.isNew,
        },
      });

      console.log("User successfully created in DB:", data.data);
      return c.json({ success: true, data: data.data }, 200);
    } catch (err) {
      console.error("Error creating user:", err);
      return c.json(
        { success: false, message: "Error creating user in DB" },
        500,
      );
    }
  }

  return c.json({ success: true, message: "Webhook received" }, 200);
});

export default app;
