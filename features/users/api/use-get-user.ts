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
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const userData = await response.json();
      console.log("Response", userData);
      return userData.data;
    },
  });
  return query;
};
