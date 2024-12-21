import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useDeleteImage = () => {
  const deleteImage = useMutation({
    mutationFn: async (imageName:string) => {

      const response = await client.api.cars.images[":imageName"].$post({
        param: {
          imageName
        },
      });
      if (!response.ok) {
        throw new Error("Failed to upload images");
      }
      return response.json();
    },
  });
  return deleteImage;
};
