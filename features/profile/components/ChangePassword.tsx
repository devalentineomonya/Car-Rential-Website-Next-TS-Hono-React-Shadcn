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
import { useUser } from "@clerk/nextjs";
import {
  schemaWithCurrentPassword,
  schemaWithoutCurrentPassword,
} from "@/utils/constants";
import {
  useUpdatePassword,
  useSetPassword,
} from "@/state/users/api/use-update-password";
type FormData = z.infer<
  typeof schemaWithCurrentPassword | typeof schemaWithoutCurrentPassword
>;

const ChangePassword = () => {
  const { user } = useUser();
  const isPasswordLogin = user?.passwordEnabled;
  const updatePassword = useUpdatePassword();
  const setPassword = useSetPassword();

  const form = useForm<FormData>({
    resolver: zodResolver(
      isPasswordLogin ? schemaWithCurrentPassword : schemaWithoutCurrentPassword
    ),
  });

  async function onSubmit(data: FormData) {
    try {
      let response;
      if (isPasswordLogin) {
        response = await updatePassword.mutateAsync(
          data as z.infer<typeof schemaWithCurrentPassword>
        );
        toast.success(response.message || "Password updated successfully.");
      } else {
        response = await setPassword.mutateAsync(
          data as z.infer<typeof schemaWithoutCurrentPassword>
        );
        toast.success(response.message || "Password set successfully.");
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage =  error?.message || "Failed to update password.";
      toast.error(errorMessage);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold text-foreground">
            {isPasswordLogin ? "Change Password" : "Set Password"}
          </h2>
          <p className="text-base text-muted-foreground mt-1 font-medium">
            {isPasswordLogin
              ? "To change your password, please confirm your current password."
              : "Set a password for your account to enhance security."}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            {isPasswordLogin && (
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        className="text-foreground text-base w-full outline-none focus-visible:ring-0
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
            )}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      className="text-foreground text-base w-full outline-none focus-visible:ring-0
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
                  <FormLabel>Repeat New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      className="text-foreground text-base w-full outline-none focus-visible:ring-0
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
              {isPasswordLogin
                ? updatePassword.isPending
                  ? "Updating..."
                  : "Change Password"
                : setPassword.isPending
                ? "Setting..."
                : "Set Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;

