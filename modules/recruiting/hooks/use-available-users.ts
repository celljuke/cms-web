import { trpc } from "@/lib/trpc/client";

export function useAvailableUsers() {
  return trpc.recruiting.getAvailableUsers.useQuery();
}
