import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";
import type { RephraseFieldName } from "../types/ai";

export function useRephraseField() {
  const mutation = trpc.recruiting.rephraseField.useMutation({
    onError: (error) => {
      toast.error(`Failed to rephrase: ${error.message}`);
    },
  });

  return mutation;
}
