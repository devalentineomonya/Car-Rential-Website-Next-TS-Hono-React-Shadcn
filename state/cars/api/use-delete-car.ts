import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
export const useDeleteCarMutation = () => {
  let id: string | undefined;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (carId?: string) => {
      id = carId;
      const response = await client.api.cars[":id?"].$delete({
        param: { id: carId },
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
