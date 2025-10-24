"use client";

import { User, Mail, Calendar, Briefcase } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserProfile } from "../types";
import { format } from "date-fns";

interface ProfileHeaderProps {
  profile: UserProfile | undefined;
  isLoading: boolean;
}

export function ProfileHeader({ profile, isLoading }: ProfileHeaderProps) {
  if (isLoading) {
    return (
      <Card className="p-6 shadow-none">
        <div className="flex items-start gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </Card>
    );
  }

  if (!profile) return null;

  const fullName =
    profile.first_name && profile.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : "User";

  const initials =
    profile.first_name && profile.last_name
      ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
      : profile.email.substring(0, 2).toUpperCase();

  return (
    <Card className="p-6 shadow-none">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-primary/10">
            <AvatarImage
              src={profile.profile_image_url || undefined}
              alt={fullName}
            />
            <AvatarFallback className="text-2xl bg-primary/5 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {fullName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your personal information and account settings
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{profile.email}</span>
            </div>

            {profile.job_title && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>{profile.job_title}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Member Since{" "}
                {format(new Date(profile.created_at), "MMMM d, yyyy")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {profile.role}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
