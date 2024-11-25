import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useUpdateImage = () => {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const response = await client.api.user["change-image"].$put({
        form: { file: file },
      });
      if (!response.ok) {
        throw new Error("Failed to update image");
      }
      const data = await response.json();
      return data;
    },
  });
  return mutation;
};
export const useRemoveImage = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.user["remove-image"].$put();
      if (!response.ok) {
        throw new Error("Failed to remove image");
      }
      const data = await response.json();
      return data;
    },
  });
  return mutation;
};
