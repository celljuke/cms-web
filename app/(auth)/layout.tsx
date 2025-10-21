import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Career Match Solutions",
  description: "Sign in to access AI-powered hiring and sales automation tools",
};

/**
 * Auth layout component
 * Provides minimal layout for authentication pages
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
