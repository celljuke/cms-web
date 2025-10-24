import { trpc } from "@/lib/trpc/client";

export function useCompanyContacts(companyId: number | undefined) {
  return trpc.recruiting.getCompanyContacts.useQuery(
    { companyId: companyId! },
    {
      enabled: !!companyId,
    }
  );
}
