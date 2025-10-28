import { z } from "zod";

export const notificationPreferencesSchema = z.object({
  email_new_qualified_candidates: z.boolean(),
  email_attention_needed: z.boolean(),
  email_daily_digest: z.boolean(),
  email_candidate_replies: z.boolean(),
  platform_new_qualified_candidates: z.boolean(),
  platform_attention_needed: z.boolean(),
  platform_candidate_replies: z.boolean(),
  platform_system_alerts: z.boolean(),
  daily_digest_time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
  weekly_digest_enabled: z.boolean(),
  weekly_digest_day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
});

export const updateNotificationPreferencesSchema = z.object({
  email_new_qualified_candidates: z.boolean().nullable().optional(),
  email_attention_needed: z.boolean().nullable().optional(),
  email_daily_digest: z.boolean().nullable().optional(),
  email_candidate_replies: z.boolean().nullable().optional(),
  platform_new_qualified_candidates: z.boolean().nullable().optional(),
  platform_attention_needed: z.boolean().nullable().optional(),
  platform_candidate_replies: z.boolean().nullable().optional(),
  platform_system_alerts: z.boolean().nullable().optional(),
  daily_digest_time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
    .nullable()
    .optional(),
  weekly_digest_enabled: z.boolean().nullable().optional(),
  weekly_digest_day: z
    .enum([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
    .nullable()
    .optional(),
});

export type NotificationPreferencesInput = z.infer<
  typeof notificationPreferencesSchema
>;
export type UpdateNotificationPreferencesInput = z.infer<
  typeof updateNotificationPreferencesSchema
>;
