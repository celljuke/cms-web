import { trpc } from "@/lib/trpc/client";
import type { TimeFilter } from "../types";

export function useWeeklyReport(
  weeksBack: number = 0,
  timeFilter: TimeFilter = "weekly"
) {
  return trpc.recruiting.getWeeklyReport.useQuery(
    { weeksBack, timeFilter },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      refetchOnWindowFocus: false,
    }
  );
}
