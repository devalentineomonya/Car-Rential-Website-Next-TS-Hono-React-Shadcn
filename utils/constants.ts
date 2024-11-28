import { z } from "zod";

export const noNavbarOrFooter = [
  "/sign-in",
  "/sign-up",
  "/admin",
  "/user",
] as const;

export const locations = [
  { id: 1, lat: -1.286389, lng: 36.817223, description: "Nairobi" },
  { id: 2, lat: -3.938333, lng: 39.664722, description: "Mombasa" },
  { id: 3, lat: -0.091702, lng: 34.767956, description: "Kisumu" },
  { id: 4, lat: 0.516667, lng: 35.283333, description: "Eldoret" },
  { id: 5, lat: -0.283333, lng: 36.066667, description: "Nakuru" },
  { id: 6, lat: -0.416667, lng: 36.95, description: "Nyeri" },
  { id: 7, lat: -0.716667, lng: 37.15, description: "Embu" },
  { id: 8, lat: -1.683333, lng: 37.233333, description: "Machakos" },
  { id: 9, lat: -0.45, lng: 39.65, description: "Malindi" },
  { id: 10, lat: -1.516667, lng: 37.266667, description: "Kitui" },
  { id: 11, lat: -1.2921, lng: 36.8219, description: "Westlands" },
  { id: 12, lat: -1.3032, lng: 36.7073, description: "Kikuyu" },
  { id: 13, lat: -1.3733, lng: 36.8219, description: "Karen" },
  { id: 14, lat: -1.2921, lng: 36.9319, description: "Ruiru" },
  { id: 15, lat: -1.2921, lng: 36.9519, description: "Thika" },
  { id: 16, lat: -1.2921, lng: 36.9919, description: "Juja" },
  { id: 17, lat: -1.2921, lng: 36.8719, description: "Kasarani" },
  { id: 18, lat: -1.2921, lng: 36.8119, description: "Langata" },
  { id: 19, lat: -1.2921, lng: 36.8419, description: "Ngong" },
  { id: 20, lat: -1.2921, lng: 36.8619, description: "Kiserian" },
] as const;

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 100;

 const errorMessages = {
  required: "This field is required",
  minLength: (field: string) =>
    `${field} must be at least ${PASSWORD_MIN_LENGTH} characters`,
  maxLength: (field: string) =>
    `${field} must be less than ${PASSWORD_MAX_LENGTH} characters`,
  passwordMatch: "Passwords do not match",
  passwordComplexity:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
} as const;

 const passwordValidation = z
  .string({ required_error: errorMessages.required })
  .min(PASSWORD_MIN_LENGTH, { message: errorMessages.minLength("Password") })
  .max(PASSWORD_MAX_LENGTH, { message: errorMessages.maxLength("Password") })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    { message: errorMessages.passwordComplexity }
  );

  export const schemaWithCurrentPassword = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: errorMessages.passwordMatch,
    path: ["repeatPassword"],
  });

export const schemaWithoutCurrentPassword = z
  .object({
    newPassword: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: errorMessages.passwordMatch,
    path: ["repeatPassword"],
  });

export const INPUT_CLASSNAME =
  "text-foreground text-base  w-full outline-none focus-visible:ring-0 px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring relative h-11 flex-1 items-center bg-white/5 border border-input";
