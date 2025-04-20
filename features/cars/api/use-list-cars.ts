import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useListCars = () => {
  return useQuery({
    queryKey: [`cars-list`],
    queryFn: async () => {
      const response = await client.api.cars.list.$get({});
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const { data } = await response.json();
      return data;
    },
  });
};
