"use client";

import {
  ProfileHeader,
  ProfileForm,
  AssignedJobsSection,
  ChangePasswordForm,
} from "@/modules/profile/components";
import { useProfile } from "@/modules/profile";

export default function GeneralSettingsPage() {
  const { profile, isLoading } = useProfile();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader profile={profile} isLoading={isLoading} />

      {/* Profile Form */}
      <ProfileForm profile={profile} />

      {/* Change Password */}
      <ChangePasswordForm />

      {/* Assigned Jobs */}
      <AssignedJobsSection />
    </div>
  );
}
