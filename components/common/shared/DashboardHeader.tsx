"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CiWarning } from "react-icons/ci";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DashboardHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
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
            <h2 className="font-semibold text-xl text-foreground">{title}</h2>
            <p className="text-base font-medium text-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardHeader;
