import { trpc } from "@/lib/trpc/client";

export function useCompanyDepartments(companyId: number | undefined) {
  return trpc.recruiting.getCompanyDepartments.useQuery(
    { companyId: companyId! },
    {
      enabled: !!companyId,
    }
  );
}
