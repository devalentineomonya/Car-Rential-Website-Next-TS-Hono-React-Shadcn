import React from "react";
import Image from "next/image";
import userAvatar from "@/public/images/avatar.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ProfileImage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold text-foreground">
            Change Profile
          </h2>
          <p className="text-base text-muted-foreground mt-1 font-medium">
            Change your profile picture from here
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex-col flex items-center justify-center">
        <Avatar className="h-36 w-36">
          <AvatarImage />
          <AvatarFallback>
            <Image src={userAvatar} alt="User avatar" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center gap-x-3 my-6">
          <Button variant="default">Upload</Button>
          <Button variant="secondary">Reset</Button>
        </div>
        <CardFooter>
          <p className="text-sm font-normal text-muted-foreground">
            Allowed JPG, GIF or PNG. Max size of 800K
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProfileImage;
