import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useDeleteImage = () => {
  const deleteImage = useMutation({
    mutationFn: async (imageName:string) => {

      const response = await client.api.cars.images[":imageName"].$delete({
        param: {
          imageName
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      return response.json();
    },
  });
  return deleteImage;
};
