import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCar = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: [`car-${id}`],
    queryFn: async () => {
      const response = await client.api.cars[":id"].$get({
        param: {
          id,
        },
      });
      console.log( "Response json ",await response.json())
      if (!response.ok) {
        throw new Error("Failed to fetch car");
      }
      const { data } = await response.json();
      return data;
    },
  });
};
