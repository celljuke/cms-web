import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

export function useUpdateNotificationPreferences() {
  const utils = trpc.useUtils();

  return trpc.recruiting.updateNotificationPreferences.useMutation({
    onSuccess: () => {
      toast.success("Preferences updated successfully!");
      utils.recruiting.getNotificationPreferences.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update preferences");
    },
  });
}
