"use client";

import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PermissionGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

export function PermissionGuard({
  children,
  allowedRoles,
  fallbackPath = "/recruiting",
}: PermissionGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Only check after loading is complete
    if (!isLoading) {
      // If authenticated, ensure we don't redirect
      if (isAuthenticated) {
        setShouldRedirect(false);
      } else {
        // If not authenticated after loading is done, prepare to redirect
        setShouldRedirect(true);
      }
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    // Perform redirect only if not loading and should redirect
    if (!isLoading && shouldRedirect && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [shouldRedirect, router, isLoading, isAuthenticated]);

  // Still loading - show nothing (or you could show a spinner)
  if (isLoading) {
    return null;
  }

  // Not authenticated after loading - wait for redirect
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check if user has required role
  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            The page you are looking for doesn't exist or you don't have
            permission to access it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push(fallbackPath)}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
