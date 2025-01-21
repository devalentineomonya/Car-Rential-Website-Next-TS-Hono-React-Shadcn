import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      const response = await client.api.cars.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const { data } = await response.json();
      return data;
    },
  });
};
