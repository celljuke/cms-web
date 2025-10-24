"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Sparkles } from "lucide-react";

interface MethodSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMethod: (method: "existing" | "scratch") => void;
}

export function MethodSelection({
  open,
  onOpenChange,
  onSelectMethod,
}: MethodSelectionProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add a Job</DialogTitle>
          <DialogDescription className="text-base">
            Choose how you'd like to add a job to AgentVIP.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="h-auto flex-col items-start gap-2 p-4 hover:bg-primary/5 hover:border-primary"
            onClick={() => onSelectMethod("existing")}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">
                  Register an Existing Job with AgentVIP
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Import a job that already exists in your CATS system
            </p>
          </Button>

          <Button
            variant="outline"
            className="h-auto flex-col items-start gap-2 p-4 hover:bg-primary/5 hover:border-primary"
            onClick={() => onSelectMethod("scratch")}
          >
            <div className="flex items-center gap-2 w-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold">
                  Create a New Job from Scratch
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Build a new job posting with our step-by-step wizard
            </p>
          </Button>
        </div>

        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
