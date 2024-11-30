"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { ClerkLoaded, ClerkLoading, useAuth } from "@clerk/nextjs";
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
import Logo from "@/public/images/logo.png";
import { INPUT_CLASSNAME } from "@/utils/constants";
export default function Page() {
  const { isLoaded } = useAuth();

  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-7 h-full bg-gray-700 dark:bg-gray-900 hidden lg:flex items-center justify-center">
        <Image src={Logo} alt="Car Rental" className="w-96" />
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
          {!isLoaded && <Icons.spinner className="size-4 animate-spin" />}
          <ClerkLoaded>
            <SignIn.Root>
              <Clerk.Loading>
                {(isGlobalLoading) => (
                  <>
                    <SignIn.Step name="start">
                      <Card className="w-full sm:w-96">
                        <CardContent className="grid gap-y-4 pt-12">
                          <div className="grid grid-cols-1 gap-x-4">
                            <Clerk.Connection name="google" asChild>
                              <Button
                                size="sm"
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
                          <Clerk.Field name="identifier" className="space-y-2">
                            <Clerk.Label asChild>
                              <Label>Email address</Label>
                            </Clerk.Label>
                            <Clerk.Input type="email" required asChild>
                              <Input className={INPUT_CLASSNAME} />
                            </Clerk.Input>
                            <Clerk.FieldError className="block text-sm text-destructive" />
                          </Clerk.Field>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignIn.Action submit asChild>
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
                            </SignIn.Action>

                            <Button variant="link" size="sm" asChild>
                              <Clerk.Link navigate="sign-up">
                                Don&apos;t have an account? Sign up
                              </Clerk.Link>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignIn.Step>

                    <SignIn.Step name="choose-strategy">
                      <Card className="w-full sm:w-96">
                        <CardHeader>
                          <CardTitle>Use another method</CardTitle>
                          <CardDescription>
                            Facing issues? You can use any of these methods to
                            sign in.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-y-4">
                          <SignIn.SupportedStrategy name="email_code" asChild>
                            <Button
                              type="button"
                              variant="link"
                              disabled={isGlobalLoading}
                            >
                              Email code
                            </Button>
                          </SignIn.SupportedStrategy>
                          <SignIn.SupportedStrategy name="password" asChild>
                            <Button
                              type="button"
                              variant="link"
                              disabled={isGlobalLoading}
                            >
                              Password
                            </Button>
                          </SignIn.SupportedStrategy>
                        </CardContent>
                        <CardFooter>
                          <div className="grid w-full gap-y-4">
                            <SignIn.Action navigate="previous" asChild>
                              <Button disabled={isGlobalLoading}>
                                <Clerk.Loading>
                                  {(isLoading) => {
                                    return isLoading ? (
                                      <Icons.spinner className="size-4 animate-spin" />
                                    ) : (
                                      "Go back"
                                    );
                                  }}
                                </Clerk.Loading>
                              </Button>
                            </SignIn.Action>
                          </div>
                        </CardFooter>
                      </Card>
                    </SignIn.Step>

                    <SignIn.Step name="verifications">
                      <SignIn.Strategy name="password">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Enter your password</CardTitle>
                            <CardDescription>
                              Please enter your password to continue
                            </CardDescription>
                            <p className="text-sm text-muted-foreground">
                              Welcome back <SignIn.SafeIdentifier />
                            </p>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <Clerk.Field name="password" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label>Password</Label>
                              </Clerk.Label>
                              <Clerk.Input type="password" asChild>
                                <Input className={INPUT_CLASSNAME} />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
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
                              </SignIn.Action>
                              <SignIn.Action navigate="choose-strategy" asChild>
                                <Button type="button" size="sm" variant="link">
                                  Use another method
                                </Button>
                              </SignIn.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Strategy>

                      <SignIn.Strategy name="email_code">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Check your email</CardTitle>
                            <CardDescription>
                              Enter the verification code sent to your email
                            </CardDescription>
                            <p className="text-sm text-muted-foreground">
                              Welcome back <SignIn.SafeIdentifier />
                            </p>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <Clerk.Field name="code">
                              <Clerk.Label className="sr-only">
                                Email verification code
                              </Clerk.Label>
                              <div className="grid gap-y-2 items-center justify-center">
                                <div className="flex justify-center text-center">
                                  <Clerk.Input
                                    type="otp"
                                    autoSubmit
                                    className=" flex justify-center gap-x-2 has-[:disabled]:opacity-50"
                                    render={({ value, status }) => {
                                      return (
                                        <div
                                          data-status={status}
                                          className="text-foreground text-base  w-11 outline-none focus-visible:ring-0
                                                      px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                                                        relative h-11 flex-1 items-center bg-white/5 border border-input flex  justify-center 
                                                        border-y border-r  shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md
                                                        data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 
                                                        data-[status=cursor]:ring-ring"
                                        >
                                          {value}
                                        </div>
                                      );
                                    }}
                                  />
                                </div>
                                <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                <SignIn.Action
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
                                  <Button variant="link" size="sm">
                                    Didn&apos;t receive a code? Resend
                                  </Button>
                                </SignIn.Action>
                              </div>
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
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
                              </SignIn.Action>
                              <SignIn.Action navigate="choose-strategy" asChild>
                                <Button size="sm" variant="link">
                                  Use another method
                                </Button>
                              </SignIn.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Strategy>
                    </SignIn.Step>
                  </>
                )}
              </Clerk.Loading>
            </SignIn.Root>
          </ClerkLoaded>
          <ClerkLoading>
            <Icons.spinner className="size-4 animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
