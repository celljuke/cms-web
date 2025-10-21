"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc/client";
import type { AuthUser } from "../types";

/**
 * Hook for managing auth state using tRPC
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Get token from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  // Validate token using tRPC
  const { data: validationData, isLoading: isValidating } =
    trpc.auth.validateToken.useQuery(
      { token: token || "" },
      {
        enabled: !!token,
        retry: false,
      }
    );

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    if (validationData) {
      setIsAuthenticated(validationData.isValid);
      if (validationData.isValid && validationData.user) {
        setUser({
          id: validationData.user.id,
          email: validationData.user.sub,
          role: validationData.user.role,
        });
      } else {
        setUser(null);
      }
    }

    setIsLoading(isValidating);
  }, [token, validationData, isValidating]);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
}
