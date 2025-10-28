import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function PreferencesHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="shrink-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-1 md:mb-2">
          Notification Preferences
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Configure when and how you receive notifications about your
          recruitment activities
        </p>
      </div>
    </div>
  );
}
