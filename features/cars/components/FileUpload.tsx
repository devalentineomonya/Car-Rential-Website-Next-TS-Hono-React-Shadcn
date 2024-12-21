import Image from "next/image";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useUploadImage } from "@/state/cars/api/use-upload-image";
interface FilePreview {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
}

interface FileUploadProps {
  onFilesChange: (files: string[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesChange }) => {
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const uploadImage = useUploadImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const newPreviews = fileArray.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),

    }));

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = async () => {
    try {
      const filesToUpload = filePreviews.map((preview) => preview.file);
      const response = await uploadImage.mutateAsync(filesToUpload);
      
      // Update filePreviewts with uploaded URLs
      setFilePreviews((prev) => 
        prev.map((preview, index) => ({
          ...preview,
          uploadedUrl: response.images[index]
        }))
      );

      // Pass only the uploaded URLs to parent
      onFilesChange(response.images);
      toast.success("Images uploaded successfully");
      console.log("Uploaded:", response);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Error uploading files");
    }
  };

  const removeFile = (index: number) => {
    setFilePreviews((prev) => {
      const updatedPreviews = [...prev];
      const removedPreview = updatedPreviews.splice(index, 1)[0];
      URL.revokeObjectURL(removedPreview.previewUrl);
      return updatedPreviews;
    });
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
      {filePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {filePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <Image
                width={100}
                height={100}
                quality={100}
                src={preview.previewUrl}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 h-7 w-7 bg-red-500 text-white rounded-lg"
              >
                <RiCloseFill className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
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

export default FileUpload;
