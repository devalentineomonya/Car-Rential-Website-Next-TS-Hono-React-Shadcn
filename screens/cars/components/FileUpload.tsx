import Image from "next/image";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useDeleteImage } from "@/features//cars/api/use-delete-image";
import { useUploadImage } from "@/features//cars/api/use-upload-image";

interface FilePreview {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
}

interface FileUploadProps {
  onFilesChange: (files: string[]) => void;
  existingFiles?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ existingFiles = [], onFilesChange }) => {
const deleteImage = useDeleteImage()


  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const uploadImage = useUploadImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPreviews = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = async () => {
    try {
      const filesToUpload = filePreviews.map((preview) => preview.file);
      const response = await uploadImage.mutateAsync(filesToUpload);

      setFilePreviews((prev) =>
        prev.map((preview, index) => ({
          ...preview,
          uploadedUrl: response.images[index],
        }))
      );

      onFilesChange(response.images);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    }
  };

  const removeFile = async (index: number, url: string, isExistingFile = false) => {
    try {
      toast.loading("Deleting image...");
      // Extract public ID from the URL
      const publicId = url.split("/").slice(-1).join("").replace(/\.[^/.]+$/, "");

      // Call the deleteImage mutation
      await deleteImage.mutateAsync(publicId);

      // Update the state
      if (isExistingFile) {
        onFilesChange(existingFiles.filter((_, i) => i !== index));
      } else {
        setFilePreviews((prev) => {
          const updatedPreviews = [...prev];
          const removedPreview = updatedPreviews.splice(index, 1)[0];
          URL.revokeObjectURL(removedPreview.previewUrl);
          return updatedPreviews;
        });
      }

      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const renderPreviews = () => {
    return (
      <div className="mt-4 grid grid-cols-4 gap-4">
        {existingFiles.map((url, index) => (
          <PreviewItem
            key={`existing-${index}`}
            src={url}
            alt={`Existing Preview ${index + 1}`}
            onRemove={() => removeFile(index, url,true)}
          />
        ))}
        {filePreviews.map((preview, index) => (
          <PreviewItem
            key={`new-${index}`}
            src={preview.previewUrl}
            alt={`New Preview ${index + 1}`}
            onRemove={() => removeFile(index,(preview.uploadedUrl || ""))}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <div className="px-4 py-8 border border-dashed rounded-lg text-center">
          Click to select files
        </div>
      </label>
      {renderPreviews()}
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleUpload}
          variant="default"
          type="button"
          disabled={filePreviews.length === 0}
        >
          {uploadImage.isPending ? (
            <div className="flex items-center space-x-2">
              <Icons.spinner className="animate-spin size-6" />
              <span>Uploading...</span>
            </div>
          ) : (
            "Upload Files"
          )}
        </Button>
      </div>
    </div>
  );
};

const PreviewItem: React.FC<{ src: string; alt: string; onRemove: () => void }> = ({
    src,
    alt,
    onRemove,
  }) => (
    <div className="relative">
      <Image
        width={100}
        height={100}
        quality={100}
        src={src}
        alt={alt}
        className="w-full h-32 object-cover rounded"
      />
      <Button
        variant="destructive"
        size="icon"
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 h-7 w-7 bg-red-500 text-white rounded-lg"
      >
        <Icons.spinner className="animate-spin w-4 h-4" /> {/* Optional spinner */}
        <RiCloseFill className="w-4 h-4" />
      </Button>
    </div>
  );
export default FileUpload;
