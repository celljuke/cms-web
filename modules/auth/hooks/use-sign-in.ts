"use client";

import { trpc } from "@/lib/trpc/client";

/**
 * Hook for managing sign-in using tRPC
 * @deprecated Use the SignInForm component directly which handles this internally
 */
export function useSignIn() {
  return trpc.auth.signIn.useMutation();
}
