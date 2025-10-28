"use client";

import {
  EmailNotificationsSection,
  PlatformNotificationsSection,
  DigestSettingsSection,
} from "@/modules/notification";
import { usePreferencesManager } from "@/modules/notification";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function NotificationSettingsLoading() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((j) => (
              <Skeleton key={j} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function NotificationSettingsPage() {
  const {
    preferences,
    isLoading,
    handleToggle,
    handleTimeChange,
    handleDayChange,
  } = usePreferencesManager();

  if (isLoading) {
    return <NotificationSettingsLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure when and how you receive notifications about your
          recruitment activities
        </p>
      </div>

      <EmailNotificationsSection
        preferences={preferences}
        onToggle={handleToggle}
      />

      <PlatformNotificationsSection
        preferences={preferences}
        onToggle={handleToggle}
      />

      <DigestSettingsSection
        preferences={preferences}
        onToggle={handleToggle}
        onTimeChange={handleTimeChange}
        onDayChange={handleDayChange}
      />
    </div>
  );
}
