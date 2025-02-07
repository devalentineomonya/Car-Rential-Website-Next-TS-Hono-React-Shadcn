"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Logo from "@/public/images/logo.png";
import { INPUT_CLASSNAME } from "@/utils/constants";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-7 h-full bg-gray-700 dark:bg-gray-900 hidden lg:flex items-center justify-center">
        <Image priority src={Logo} alt="Car Rental" className="w-96" />
      </div>
      <div className="col-span-12 lg:col-span-5 h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-foreground">
            Welcome to Deval Ride
          </h1>
          <p className="text-base text-muted-foreground">
            Login or create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 bg-background">
          <ClerkLoading>
            <Icons.spinner className="animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignUp.Root path="/auth/sign-up">
              <Clerk.Loading>
                {(isGlobalLoading) => (
                  <>
                    <SignUp.Step name="start">
                      <Card className="w-full sm:w-96 ">
                        <CardContent className="grid gap-y-4 pt-12">
                          <div className="grid grid-cols-1">
                            <Clerk.Connection name="google" asChild>
                              <Button
                                size="lg"
                                variant="outline"
                                type="button"
                                disabled={isGlobalLoading}
                              >
                                <Clerk.Loading scope="provider:google">
                                  {(isLoading) =>
                                    isLoading ? (
                                      <Icons.spinner className="size-4 animate-spin" />
                                    ) : (
                                      <>
                                        <Icons.google className="mr-2 size-4" />
                                        Google
                                      </>
                                    )
                                  }
                                </Clerk.Loading>
                              </Button>
                            </Clerk.Connection>
                          </div>
                          <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                            or
                          </p>

                          <Clerk.Field
                            name="emailAddress"
                            className="space-y-2"
                          >
                            <Clerk.Label asChild>
                              <Label>Email address</Label>
                            </Clerk.Label>
                            <Clerk.Input type="email" required asChild>
                              <Input className={INPUT_CLASSNAME} />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-destructive" />
                          </Clerk.Field>

                          <Clerk.Field name="password" className="space-y-2">
                            <Clerk.Label asChild>
                              <Label>Password</Label>
                            </Clerk.Label>
                            <Clerk.Input type="password" required asChild>
                              <Input className={INPUT_CLASSNAME} />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-destructive" />
                          </Clerk.Field>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignUp.Captcha className="empty:hidden" />
                            <SignUp.Action submit asChild>
                              <Button disabled={isGlobalLoading}>
                                <Clerk.Loading>
                                  {(isLoading) => {
                                    return isLoading ? (
                                      <Icons.spinner className="size-4 animate-spin" />
                                    ) : (
                                      "Continue"
                                    );
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignUp.Action>
                            <Button variant="link" size="sm" asChild>
                              <Clerk.Link navigate="sign-in">
                                Already have an account? Sign in
                              </Clerk.Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignUp.Step>

                    <SignUp.Step name="verifications">
                      <SignUp.Strategy name="email_code">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Verify your email</CardTitle>
                            <CardDescription>
                              Use the verification link sent to your email
                              address
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <div className="grid items-center justify-center gap-y-2">
                              <Clerk.Field name="code" className="space-y-2">
                                <Clerk.Label className="sr-only">
                                  Email address
                                </Clerk.Label>
                                <div className="flex justify-center text-center">
                                  <Clerk.Input
                                    type="otp"
                                    autoSubmit
                                    className="flex justify-center gap-x-2 has-[:disabled]:opacity-50"
                                    render={({ value, status }) => {
                                      return (
                                        <div
                                          data-status={status}
                                          className={cn(
                                            "text-foreground text-base w-11 outline-none focus-visible:ring-0",
                                            "px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
                                            "relative h-11 flex-1 items-center bg-white/5 border border-input flex justify-center",
                                            "border-y border-r shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                            "data-[status=selected]:ring-1 data-[status=selected]:ring-ring",
                                            "data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring",
                                            {
                                              "z-10 ring-2 ring-ring ring-offset-background":
                                                status === "cursor" ||
                                                status === "selected",
                                            },
                                          )}
                                        >
                                          {value}
                                          {status === "cursor" && (
                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                              <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  />
                                </div>
                                <Clerk.FieldError className="block text-center text-sm text-destructive" />
                              </Clerk.Field>
                              <SignUp.Action
                                asChild
                                resend
                                className="text-muted-foreground"
                                fallback={({ resendableAfter }) => (
                                  <Button variant="link" size="sm" disabled>
                                    Didn&apos;t receive a code? Resend (
                                    <span className="tabular-nums">
                                      {resendableAfter}
                                    </span>
                                    )
                                  </Button>
                                )}
                              >
                                <Button type="button" variant="link" size="sm">
                                  Didn&apos;t receive a code? Resend
                                </Button>
                              </SignUp.Action>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignUp.Action submit asChild>
                                <Button disabled={isGlobalLoading}>
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        "Continue"
                                      );
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignUp.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignUp.Strategy>
                    </SignUp.Step>
                  </>
                )}
              </Clerk.Loading>
            </SignUp.Root>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
