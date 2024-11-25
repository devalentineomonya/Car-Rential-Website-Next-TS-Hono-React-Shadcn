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
import { schemaWithCurrentPassword, schemaWithoutCurrentPassword } from "@/utils/constants";

type FormData = z.infer<
  typeof schemaWithCurrentPassword | typeof schemaWithoutCurrentPassword
>;

const ChangePassword = () => {
  const { user } = useUser();
  const isSocialLogin =
    user?.externalAccounts && user.externalAccounts.length > 0;

  const form = useForm<FormData>({
    resolver: zodResolver(
      isSocialLogin ? schemaWithoutCurrentPassword : schemaWithCurrentPassword
    ),
  });

  function onSubmit(data: FormData) {
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
            {isSocialLogin ? "Set Password" : "Change Password"}
          </h2>
          <p className="text-base text-muted-foreground mt-1 font-medium">
            {isSocialLogin
              ? "Set a password for your account."
              : "To change your password, please confirm your current password."}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            {!isSocialLogin && (
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
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
