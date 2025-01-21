import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  let carIdString: string;
  const deleteImage = useMutation({
    mutationFn: async ({ url, carId }: { url: string; carId: string }) => {
      carIdString = carId;
      const response = await client.api.cars.images[":url"].$delete({
        param: {
          url,
        },
        json: { carId },
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`car-${carIdString}`] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`car-${carIdString}`] });
    },
  });

  return deleteImage;
};
