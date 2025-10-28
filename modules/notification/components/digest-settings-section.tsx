import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PreferenceToggle } from "./preference-toggle";
import type { NotificationPreferences } from "../types";

interface DigestSettingsSectionProps {
  preferences: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences, value: boolean) => void;
  onTimeChange: (value: string) => void;
  onDayChange: (value: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const DAYS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

export function DigestSettingsSection({
  preferences,
  onToggle,
  onTimeChange,
  onDayChange,
}: DigestSettingsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Digest Settings</CardTitle>
        <CardDescription>
          Configure when and how often you receive digest emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="digest-time">Daily Digest Time</Label>
          <Select
            value={preferences.daily_digest_time}
            onValueChange={onTimeChange}
          >
            <SelectTrigger id="digest-time">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((hour) => (
                <SelectItem key={hour} value={`${hour}:00`}>
                  {`${hour}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Time to receive your daily digest email
          </p>
        </div>

        <PreferenceToggle
          id="weekly-digest"
          label="Weekly Digest"
          description="Receive a weekly summary of all recruitment activities"
          checked={preferences.weekly_digest_enabled}
          onCheckedChange={(checked) =>
            onToggle("weekly_digest_enabled", checked)
          }
        />

        {preferences.weekly_digest_enabled && (
          <div className="space-y-2">
            <Label htmlFor="digest-day">Weekly Digest Day</Label>
            <Select
              value={preferences.weekly_digest_day}
              onValueChange={onDayChange}
            >
              <SelectTrigger id="digest-day">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Day of the week to receive your weekly digest
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
