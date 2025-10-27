import { trpc } from "@/lib/trpc/client";

interface UseNotificationsOptions {
  unreadOnly?: boolean;
  limit?: number;
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  const { unreadOnly = false, limit = 50 } = options;

  return trpc.recruiting.getNotifications.useQuery(
    { unreadOnly, limit },
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );
}

export function useMarkNotificationRead() {
  const utils = trpc.useUtils();

  return trpc.recruiting.markNotificationAsRead.useMutation({
    onSuccess: () => {
      // Invalidate notifications to refetch
      utils.recruiting.getNotifications.invalidate();
    },
  });
}

export function useMarkAllNotificationsRead() {
  const utils = trpc.useUtils();

  return trpc.recruiting.markAllNotificationsAsRead.useMutation({
    onSuccess: () => {
      // Invalidate notifications to refetch
      utils.recruiting.getNotifications.invalidate();
    },
  });
}
