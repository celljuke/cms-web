"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { UpdateProfilePayload } from "../types";

/**
 * Hook for updating user profile
 */
export function useUpdateProfile() {
  const utils = trpc.useUtils();

  const mutation = trpc.profile.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully");
      // Invalidate profile query to refetch
      utils.profile.getProfile.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const updateProfile = async (data: UpdateProfilePayload) => {
    return mutation.mutateAsync(data);
  };

  return {
    updateProfile,
    isUpdating: mutation.isPending,
    error: mutation.error,
  };
}
