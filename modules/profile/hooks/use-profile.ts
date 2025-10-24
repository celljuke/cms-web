"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook for fetching user profile data
 */
export function useProfile() {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = trpc.profile.getProfile.useQuery(undefined, {
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    profile,
    isLoading,
    error,
    refetch,
  };
}
