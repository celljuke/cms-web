import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PreferenceToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function PreferenceToggle({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: PreferenceToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5 flex-1">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
