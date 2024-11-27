"use client";
import React, { useState } from "react";
import Image from "next/image";
import userAvatar from "@/public/images/avatar.png";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useUpdateImage,
  useRemoveImage,
} from "@/state/users/api/use-update-image";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/ui/icons";

const MAX_FILE_SIZE = 8000 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const ProfileImage = () => {
  const { user } = useUser();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const updateImage = useUpdateImage();
  const removeImage = useRemoveImage();

  const validateFile = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or GIF file");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 800KB");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsDialogOpen(true);
  };

  const handleReupload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!previewUrl) return;
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      await updateImage.mutateAsync(file);
      toast.success("Profile image updated successfully");
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload the image");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await removeImage.mutateAsync();
      toast.success("Profile image deleted successfully");
      setPreviewUrl(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the image");
    }
  };

  return (
    <>
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
            <AvatarImage src={previewUrl || user?.imageUrl} />
            <AvatarFallback>
              <Image src={userAvatar} alt="User avatar" />
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center gap-x-3 my-6">
            <Button variant="default" disabled={updateImage.isPending}>
              <Label htmlFor="image" className="cursor-pointer bg-transparent">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  hidden
                  className="h-0 w-0 bg-transparent p-0 outline-none border-none"
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  onChange={handleFileChange}
                />
                {updateImage.isPending ? (
                  <Icons.spinner className="size-6 animate-spin" />
                ) : (
                  "Upload"
                )}
              </Label>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={updateImage.isPending}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Image</DialogTitle>
            <DialogDescription>
              Please confirm the selected image before uploading.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-52 w-52">
              <AvatarImage src={previewUrl || user?.imageUrl || ""} />
              <AvatarFallback>
                <Image src={userAvatar} alt="User avatar preview" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-4">
              <Button variant="outline" disabled={updateImage.isPending}>
                <Label
                  htmlFor="reupload"
                  className="cursor-pointer bg-transparent"
                >
                  <Input
                    id="reupload"
                    name="reupload"
                    type="file"
                    hidden
                    className="h-0 w-0 bg-transparent p-0 outline-none border-none"
                    accept={ALLOWED_FILE_TYPES.join(",")}
                    onChange={handleReupload}
                  />
                </Label>
                Change Image
              </Button>
              <Button
                disabled={updateImage.isPending}
                variant="default"
                onClick={handleUpload}
              >
                {updateImage.isPending ? (
                  <Icons.spinner className="size-7 animate-spin" />
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              profile image and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage}>
              {removeImage.isPending ? (
                <Icons.spinner className="size-6 animate-spin" />
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileImage;
