import { trpc } from "@/lib/trpc/client";

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
