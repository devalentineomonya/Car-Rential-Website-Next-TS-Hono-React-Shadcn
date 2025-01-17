import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetUser = (clerkId?: string) => {
  const query = useQuery({
    enabled: !!clerkId,
    queryKey: ["user", { clerkId }],
    queryFn: async () => {
      const response = await client.api.users[":clerkId?"].$get({
        param: { clerkId: clerkId },
      });
      const userData = await response.json();
      if (!response.ok || !userData.success) {
        if ('message' in userData) {
          throw new Error(userData.message || "Failed to fetch user");
        }
      }
      console.log("Response", userData);
      if ('data' in userData) {
        return userData.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });
  return query;
};
