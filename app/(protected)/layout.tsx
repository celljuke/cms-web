import { Header } from "@/components/header";
import { cookies } from "next/headers";
import { profileService } from "@/server/services/profile";
import type { UserProfile } from "@/modules/profile/types";

// Force dynamic rendering for this layout
export const dynamic = "force-dynamic";

/**
 * Fetch user profile on server-side
 */
async function getProfile(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return null;
    }

    const profile = await profileService.getProfile(token);
    return profile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <div className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header profile={profile} />
      {children}
    </div>
  );
}
