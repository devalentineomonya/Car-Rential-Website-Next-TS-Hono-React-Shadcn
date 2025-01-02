import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { dynamicSchema } from "@/db/schema";
import { client } from "@/lib/hono";
export const useUpdateCar = () => {
  let id: string | undefined;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (car: z.infer<typeof dynamicSchema>) => {

      id = car.id;
      const response = await client.api.cars.$put({
        json: car,
      });
      if (!response.ok) {
        throw new Error("Failed to update car");
      }
      const { data } = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars", "car", { id }] });
    },
    
  });
  return mutation;
};
