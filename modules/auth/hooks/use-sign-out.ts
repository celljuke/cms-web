"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Hook for managing sign-out
 */
export function useSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear httpOnly cookie via API route
      await fetch("/api/auth/set-token", {
        method: "DELETE",
      });

      // Clear tokens from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
      }

      // Show message
      toast.success("Signed out successfully");

      // Redirect to sign-in
      router.push("/sign-in");
    } catch (error) {
      console.error("Error during sign out:", error);
      // Still redirect even if there's an error
      router.push("/sign-in");
    }
  };

  return {
    handleSignOut,
  };
}
