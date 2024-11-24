"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  currentPasswordMatch: "New password must be different from current password",
} as const;

const passwordValidation = z
  .string({ required_error: errorMessages.required })
  .min(PASSWORD_MIN_LENGTH, { message: errorMessages.minLength("Password") })
  .max(PASSWORD_MAX_LENGTH, { message: errorMessages.maxLength("Password") })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    { message: errorMessages.passwordComplexity }
  );

export const ChangePasswordSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    repeatPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: errorMessages.passwordMatch,
    path: ["repeatPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: errorMessages.currentPasswordMatch,
    path: ["newPassword"],
  });
const ChangePassword = () => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  function onSubmit(data: z.infer<typeof ChangePasswordSchema>) {
    toast.info(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold text-foreground">
            Change Password
          </h2>
          <p className="text-base text-muted-foreground mt-1 font-medium">
            To change your password please confirm here
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                         px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                          relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
