export type NotificationType =
  | "email_attention"
  | "new_qualified_candidates"
  | "daily_digest"
  | "candidate_reply"
  | "application_processed"
  | "system_alert";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: NotificationType;
  priority: NotificationPriority;
  metadata: Record<string, any>;
  action_url: string | null;
  is_read: boolean;
  is_dismissed: boolean;
  read_at: string | null;
  created_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}
