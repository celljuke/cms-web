import { trpc } from "@/lib/trpc/client";

export function useNotifications(
  unreadOnly: boolean = false,
  limit: number = 50
) {
  return trpc.recruiting.getNotifications.useQuery(
    {
      unreadOnly,
      limit,
    },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );
}
