import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
const LoginBanner = () => {
  const { isSignedIn } = useUser();
  return (
    <Alert className="bg-muted p-2 mt-6">
      <AlertDescription className="flex justify-between items-center">
        <span className="text-lg font-medium text-foreground">
          Login for personalized support
        </span>
        <div className="flex gap-2">
          {!isSignedIn ? (
            <>
              <Link
                className="inline-block px-5 py-2 bg-background text-foreground rounded-md border border-border"
                href="/auth/sign-in"
              >
                Login
              </Link>
              <Link
                className="inline-block px-5 py-2 bg-foreground text-background rounded-md "
                href="/auth/sign-up"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link
              className="inline-block px-8 py-2 bg-foreground text-background rounded-md border border-border"
              href="/user/dashboard"
            >
              Dashboard
            </Link>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default LoginBanner;
