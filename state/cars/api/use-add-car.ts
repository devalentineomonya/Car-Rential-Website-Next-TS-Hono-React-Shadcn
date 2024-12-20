import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { dynamicSchema } from "@/db/schema";
import { client } from "@/lib/hono";
export const useAddCar = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof dynamicSchema>) => {
      const response = await client.api.cars.$post({
        json: data,
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
