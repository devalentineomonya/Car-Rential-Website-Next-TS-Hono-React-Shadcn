import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { client } from "@/lib/hono";
import { insertUserSchema } from "@/db/schema";

export const useUpdateUser = () => {
  const query = useMutation({
    mutationFn: async (data: z.infer<typeof insertUserSchema>) => {
      const response = await client.api.users[":id"].$put({
        param: { id: data.id },
        json: {
          id: data.id,
          clerk_id: data.clerk_id,
          email: data.email,
          firstName: data.firstName ?? null,
          lastName: data.lastName ?? null,
          location: data.location ?? null,
          address: data.address ?? null,
          phone: data.phone ?? null
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const { data: updatedUser } = await response.json();
      return updatedUser;
    },
  });
  return query;
};
