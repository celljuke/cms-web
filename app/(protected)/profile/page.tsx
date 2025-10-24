"use client";

import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProfileHeader,
  ProfileForm,
  AssignedJobsSection,
  ChangePasswordForm,
} from "@/modules/profile/components";
import { useProfile } from "@/modules/profile";
import Link from "next/link";

export default function ProfilePage() {
  const { profile, isLoading } = useProfile();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              My Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and account settings
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/recruiting">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader profile={profile} isLoading={isLoading} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <ProfileForm profile={profile} />

            {/* Change Password */}
            <ChangePasswordForm />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Assigned Jobs */}
            <AssignedJobsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
