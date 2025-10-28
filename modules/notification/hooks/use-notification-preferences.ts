import { trpc } from "@/lib/trpc/client";

export function useNotificationPreferences() {
  return trpc.recruiting.getNotificationPreferences.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
