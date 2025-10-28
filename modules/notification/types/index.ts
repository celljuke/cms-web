export interface NotificationPreferences {
  email_new_qualified_candidates: boolean;
  email_attention_needed: boolean;
  email_daily_digest: boolean;
  email_candidate_replies: boolean;
  platform_new_qualified_candidates: boolean;
  platform_attention_needed: boolean;
  platform_candidate_replies: boolean;
  platform_system_alerts: boolean;
  daily_digest_time: string;
  weekly_digest_enabled: boolean;
  weekly_digest_day: string;
}

export interface UpdateNotificationPreferences {
  email_new_qualified_candidates?: boolean | null;
  email_attention_needed?: boolean | null;
  email_daily_digest?: boolean | null;
  email_candidate_replies?: boolean | null;
  platform_new_qualified_candidates?: boolean | null;
  platform_attention_needed?: boolean | null;
  platform_candidate_replies?: boolean | null;
  platform_system_alerts?: boolean | null;
  daily_digest_time?: string | null;
  weekly_digest_enabled?: boolean | null;
  weekly_digest_day?: string | null;
}

export interface PreferenceToggleItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}
