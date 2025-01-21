import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useUploadImage = () => {
  const uploadImage = useMutation({
    mutationFn: async (images: File[]) => {
      const response = await client.api.cars.images.$post({
        form: {
          images,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to upload images");
      }
      return response.json();
    },
  });
  return uploadImage;
};
