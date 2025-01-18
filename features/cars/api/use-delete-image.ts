import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useDeleteImage = () => {
  const deleteImage = useMutation({
    mutationFn: async ({
      publicId,
      carId,
    }: {
      publicId: string;
      carId: string;
    }) => {
      const response = await client.api.cars.images[":publicId"].$delete({
        param: {
          publicId,
        },
        json: { carId },
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      return response.json();
    },
  });
  return deleteImage;
};
