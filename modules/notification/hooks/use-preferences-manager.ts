import { useState, useEffect } from "react";
import { useNotificationPreferences } from "./use-notification-preferences";
import { useUpdateNotificationPreferences } from "./use-update-notification-preferences";
import type { NotificationPreferences } from "../types";

const DEFAULT_PREFERENCES: NotificationPreferences = {
  email_new_qualified_candidates: true,
  email_attention_needed: true,
  email_daily_digest: true,
  email_candidate_replies: true,
  platform_new_qualified_candidates: true,
  platform_attention_needed: true,
  platform_candidate_replies: true,
  platform_system_alerts: true,
  daily_digest_time: "09:00",
  weekly_digest_enabled: false,
  weekly_digest_day: "monday",
};

export function usePreferencesManager() {
  const { data: preferences, isLoading } = useNotificationPreferences();
  const updatePreferences = useUpdateNotificationPreferences();

  const [localPreferences, setLocalPreferences] =
    useState<NotificationPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    const updated = { ...localPreferences, [key]: value };
    setLocalPreferences(updated);
    updatePreferences.mutate({ [key]: value });
  };

  const handleTimeChange = (value: string) => {
    const updated = { ...localPreferences, daily_digest_time: value };
    setLocalPreferences(updated);
    updatePreferences.mutate({ daily_digest_time: value });
  };

  const handleDayChange = (value: string) => {
    const updated = { ...localPreferences, weekly_digest_day: value };
    setLocalPreferences(updated);
    updatePreferences.mutate({ weekly_digest_day: value });
  };

  return {
    preferences: localPreferences,
    isLoading,
    handleToggle,
    handleTimeChange,
    handleDayChange,
  };
}
