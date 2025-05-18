import Image from "next/image";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useDeleteImage } from "@/features/cars/api/use-delete-image";
import { useUploadImage } from "@/features/cars/api/use-upload-image";
import { useEditCar } from "@/hooks/use-edit-car";

interface FilePreview {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
}

interface FileUploadProps {
  onFilesChange: (files: string[]) => void;
  existingFiles?: string[];
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const FileUpload: React.FC<FileUploadProps> = ({
  existingFiles = [],
  onFilesChange,
}) => {
  const deleteImage = useDeleteImage();
  const { id } = useEditCar();
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const uploadImage = useUploadImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast.error(
          `File ${file.name} is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`,
        );
      } else {
        validFiles.push(file);
      }
    });

    const newPreviews = validFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const compressionOptions = {
        maxSizeMB: 9.5,
        useWebWorker: true,
      };

      // Track original indices for proper URL mapping
      const compressionPromises = filePreviews.map(
        async (preview, originalIndex) => {
          try {
            const compressedFile = await imageCompression(
              preview.file,
              compressionOptions,
            );
            return { originalIndex, compressedFile };
          } catch (error) {
            console.error("Error compressing image:", error);
            toast.error(
              `Failed to compress ${preview.file.name}. It may be too large.`,
            );
            return null;
          }
        },
      );

      const compressionResults = await Promise.all(compressionPromises);
      const validResults = compressionResults.filter(
        (result): result is { originalIndex: number; compressedFile: File } =>
          result !== null,
      );

      // Check for files still over the limit after compression
      const overLimitResults = validResults.filter(
        (result) => result.compressedFile.size > MAX_FILE_SIZE_BYTES,
      );

      if (overLimitResults.length > 0) {
        overLimitResults.forEach((result) => {
          toast.error(
            `${result.compressedFile.name} is too large after compression (${(
              result.compressedFile.size /
              1024 /
              1024
            ).toFixed(2)}MB). Please choose a smaller file.`,
          );
        });
        return;
      }

      // Upload valid compressed files
      const filesToUpload = validResults.map((result) => result.compressedFile);
      const response = await uploadImage.mutateAsync(filesToUpload);

      // Update previews with uploaded URLs
      setFilePreviews((prev) => {
        const updatedPreviews = [...prev];
        validResults.forEach((result, i) => {
          updatedPreviews[result.originalIndex].uploadedUrl = response.images[i];
        });
        return updatedPreviews;
      });

      // Update parent with existing files + new uploaded URLs
      onFilesChange([...existingFiles, ...response.images]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    }
  };

  const removeFile = async (
    index: number,
    url: string,
    isExistingFile = false,
  ) => {
    const toastId = toast.loading("Deleting image...");
    try {
      if (!id) {
        return toast.error("Car id is not set");
      }
      const encoded = encodeURIComponent(url);
      await deleteImage.mutateAsync({ url: encoded, carId: id });

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
    } finally {
      toast.dismiss(toastId);
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
            onRemove={() => removeFile(index, url, true)}
          />
        ))}
        {filePreviews.map((preview, index) => (
          <PreviewItem
            key={`new-${index}`}
            src={preview.previewUrl}
            alt={`New Preview ${index + 1}`}
            onRemove={() => removeFile(index, preview.uploadedUrl || "")}
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
        <div className="px-4 py-12 border border-dashed rounded-lg text-center">
          Click to select files (max {MAX_FILE_SIZE_MB}MB each)
        </div>
      </label>
      {renderPreviews()}
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleUpload}
          variant="default"
          type="button"
          disabled={filePreviews.length === 0 || uploadImage.isPending}
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

const PreviewItem: React.FC<{
  src: string;
  alt: string;
  onRemove: () => void;
}> = ({ src, alt, onRemove }) => (
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
      <RiCloseFill className="w-4 h-4" />
    </Button>
  </div>
);

export default FileUpload;
