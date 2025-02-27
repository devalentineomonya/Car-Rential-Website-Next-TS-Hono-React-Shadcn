import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { insertCarSchema } from "@/db/schema";
import { client } from "@/lib/hono";
export const useAddCar = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertCarSchema>) => {
      const response = await client.api.cars.$post({
        json: {
          ...data,
          images: Array.isArray(data.images)
            ? data.images.filter((img): img is string => img !== null)
            : [],
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add car");
      }
      const { car } = await response.json();
      return car;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
  return mutation;
};
