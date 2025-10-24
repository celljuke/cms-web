import { trpc } from "@/lib/trpc/client";

export function useWorkflows() {
  return trpc.recruiting.getWorkflows.useQuery();
}
