import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export interface ListCarsParams {
  for?: string[];
  color?: string[];
  category?: string[];
  model?: string[];
  make?: string[];
  fuelType?: string[];
  drivetrain?: string[];
  limit?: number;
}

export const useListCars = (params?: ListCarsParams) => {
  return useQuery({
    queryKey: ["cars-list", params],
    queryFn: async () => {
      const queryParams = {
        ...params,
        for: params?.for?.join(","),
        color: params?.color?.join(","),
        category: params?.category?.join(","),
        model: params?.model?.join(","),
        make: params?.make?.join(","),
        fuelType: params?.fuelType?.join(","),
        drivetrain: params?.drivetrain?.join(","),
      };

      const response = await client.api.cars.list.$get({
        query: queryParams,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const { data } = await response.json();
      return data;
    },

    staleTime: 5000,
  });
};
