"use client";

import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { ChangePasswordPayload } from "../types";

/**
 * Hook for changing user password
 */
export function useChangePassword() {
  const mutation = trpc.profile.changePassword.useMutation({
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });

  const changePassword = async (data: ChangePasswordPayload) => {
    return mutation.mutateAsync(data);
  };

  return {
    changePassword,
    isChanging: mutation.isPending,
    error: mutation.error,
  };
}
