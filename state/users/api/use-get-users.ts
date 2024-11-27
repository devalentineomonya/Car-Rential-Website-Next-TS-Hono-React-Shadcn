import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await client.api.users.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};

export const useGetUser = (clerkId: string, enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await client.api.users[":clerkId"].$get({
        param: { clerkId: clerkId },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const { data } = await response.json();
      return data;
    },
    enabled,
  });
  return query;
};

