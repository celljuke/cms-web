import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { PreferenceToggle } from "./preference-toggle";
import type { NotificationPreferences } from "../types";

interface EmailNotificationsSectionProps {
  preferences: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences, value: boolean) => void;
}

export function EmailNotificationsSection({
  preferences,
  onToggle,
}: EmailNotificationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Mail className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Control which notifications are sent to your email address
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PreferenceToggle
          id="email-new-candidates"
          label="New Potential Matches"
          description="When new candidates with high scores and screening emails are sent"
          checked={preferences.email_new_qualified_candidates}
          onCheckedChange={(checked) =>
            onToggle("email_new_qualified_candidates", checked)
          }
        />

        <PreferenceToggle
          id="email-attention"
          label="Email Attention Needed"
          description="When candidate emails require your immediate attention"
          checked={preferences.email_attention_needed}
          onCheckedChange={(checked) =>
            onToggle("email_attention_needed", checked)
          }
        />

        <PreferenceToggle
          id="email-replies"
          label="Candidate Replies"
          description="When candidates reply to your emails"
          checked={preferences.email_candidate_replies}
          onCheckedChange={(checked) =>
            onToggle("email_candidate_replies", checked)
          }
        />

        <PreferenceToggle
          id="email-digest"
          label="Daily Digest"
          description="Daily summary of all recruitment activities"
          checked={preferences.email_daily_digest}
          onCheckedChange={(checked) => onToggle("email_daily_digest", checked)}
        />
      </CardContent>
    </Card>
  );
}
