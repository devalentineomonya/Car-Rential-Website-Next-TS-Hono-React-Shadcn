import { z } from "zod";

// Define the schema for the form
export const heroFormSchema = z.object({
  type: z.enum(["ride", "rent", "deliver"]),
  from: z.string().optional(),
  to: z.string().optional(),
  pickUpDateTime: z.date().nullable().optional(),
  rentFromDateTime: z.date().nullable().optional(),
  rentToDateTime: z.date().nullable().optional(),
})