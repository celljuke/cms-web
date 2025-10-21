"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Hook for managing sign-out
 */
export function useSignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    // Clear tokens from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
    }

    // Clear cookie
    document.cookie = "access_token=; path=/; max-age=0";

    // Show message
    toast.success("Signed out successfully");

    // Redirect to sign-in
    router.push("/sign-in");
  };

  return {
    handleSignOut,
  };
}
