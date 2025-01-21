import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { insertCarSchema } from "@/db/schema";
import { client } from "@/lib/hono";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const carUpdateSchema = insertCarSchema.omit({ images: true }).merge(
  z.object({
    images: z.array(z.string()),
  }),
);

export const useUpdateCar = () => {
  let id: string | undefined;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (car: z.infer<typeof carUpdateSchema>) => {
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
