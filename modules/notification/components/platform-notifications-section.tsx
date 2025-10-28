import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { PreferenceToggle } from "./preference-toggle";
import type { NotificationPreferences } from "../types";

interface PlatformNotificationsSectionProps {
  preferences: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences, value: boolean) => void;
}

export function PlatformNotificationsSection({
  preferences,
  onToggle,
}: PlatformNotificationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <CardTitle>Platform Notifications</CardTitle>
            <CardDescription>
              Show notifications for new candidates in the application
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PreferenceToggle
          id="platform-new-candidates"
          label="New Potential Matches"
          description="Show notifications for new qualified candidates"
          checked={preferences.platform_new_qualified_candidates}
          onCheckedChange={(checked) =>
            onToggle("platform_new_qualified_candidates", checked)
          }
        />

        <PreferenceToggle
          id="platform-attention"
          label="Email Attention Needed"
          description="Show notifications for emails needing attention"
          checked={preferences.platform_attention_needed}
          onCheckedChange={(checked) =>
            onToggle("platform_attention_needed", checked)
          }
        />

        <PreferenceToggle
          id="platform-replies"
          label="Candidate Replies"
          description="Show notifications for candidate replies"
          checked={preferences.platform_candidate_replies}
          onCheckedChange={(checked) =>
            onToggle("platform_candidate_replies", checked)
          }
        />

        <PreferenceToggle
          id="platform-system"
          label="System Alerts"
          description="Show notifications for system alerts and important announcements"
          checked={preferences.platform_system_alerts}
          onCheckedChange={(checked) =>
            onToggle("platform_system_alerts", checked)
          }
        />
      </CardContent>
    </Card>
  );
}
