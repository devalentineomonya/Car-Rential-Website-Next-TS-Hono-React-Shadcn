import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

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

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to set password");
      }
      return result;
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
      return response.json();
    },
  });
  return mutation;
};
