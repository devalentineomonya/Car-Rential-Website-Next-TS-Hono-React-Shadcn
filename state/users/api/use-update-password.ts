import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import {
  schemaWithCurrentPassword,
  schemaWithoutCurrentPassword,
} from "@/utils/constants";

export const useSetPassword = () => {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof schemaWithoutCurrentPassword>) => {
      const response = await client.api.user["set-password"].$put({
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to set password");
      }
      return response.json();
    },
  });
  return mutation;
};

export const useUpdatePassword = () => {
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof schemaWithCurrentPassword>) => {
      const response = await client.api.user["change-password"].$put({
        json: data,
      });
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
      return response.json();
    },
  });
  return mutation;
};
