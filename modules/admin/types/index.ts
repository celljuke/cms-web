export interface OverallStats {
  active_jobs: number;
  new_applicants_this_week: number;
  applicants_assigned_match_score: number;
  applicants_sent_screening_emails: number;
  applicants_sent_reminders: number;
  applicants_who_replied: number;
  applicants_qualified: number;
}

export interface JobLevelFunnel {
  job_id: number;
  job_name: string;
  total_applicants: number;
  new_applicants_this_week: number;
  scored_applicants: number;
  screening_emails_sent: number;
  reminders_sent: number;
  replies_received: number;
  total_qualified: number;
  manual_intervention_required: number;
}

export interface FunnelDrops {
  attachment_errors: number;
  resume_parse_errors: number;
  screening_email_failures: number;
  reminder_failures: number;
}

export interface WeeklyReport {
  overall_stats: OverallStats;
  job_level_funnel: JobLevelFunnel[];
  funnel_drops: FunnelDrops;
  report_period_start: string;
  report_period_end: string;
}

export type TimeFilter = "today" | "weekly";
