"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";

interface ViewSwitcherProps {
  view: "card" | "list";
  onViewChange: (view: "card" | "list") => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1 bg-muted/50">
      <Button
        variant={view === "card" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onViewChange("card")}
        className={`h-8 px-3 ${
          view === "card"
            ? "shadow-sm"
            : "hover:bg-transparent hover:text-foreground"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onViewChange("list")}
        className={`h-8 px-3 ${
          view === "list"
            ? "shadow-sm"
            : "hover:bg-transparent hover:text-foreground"
        }`}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
}
