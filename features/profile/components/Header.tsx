"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CiWarning } from "react-icons/ci";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const Header = () => {
  const { user } = useUser();
  const isNewUser = user?.publicMetadata?.isNew;
  return (
    <>
      {isNewUser && (
        <Alert className="mb-4" variant="warning">
          <CiWarning className="h-4 w-4" />
          <AlertTitle>Complete your profile</AlertTitle>
          <AlertDescription>
            Please complete your profile to continue using the app.
          </AlertDescription>
        </Alert>
      )}
      <Card className="bg-muted">
        <CardContent className="p-6">
          <div>
            <h2 className="font-semibold text-xl text-foreground">
              Account Setting
            </h2>
            <p className="text-base font-medium text-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
