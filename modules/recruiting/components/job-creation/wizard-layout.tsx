"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardStep } from "../../stores/job-creation-store";

interface WizardLayoutProps {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  onStepChange: (step: WizardStep) => void;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  canGoNext: boolean;
  isLastStep: boolean;
  children: React.ReactNode;
}

const steps: { id: WizardStep; label: string; description: string }[] = [
  {
    id: "basic",
    label: "Basic Info",
    description: "Job title and description",
  },
  { id: "location", label: "Location", description: "Where is this job?" },
  { id: "company", label: "Company", description: "Company and team details" },
  { id: "details", label: "Details", description: "Salary and requirements" },
  {
    id: "tags",
    label: "Tags & Groups",
    description: "Organization and access",
  },
  { id: "review", label: "Review", description: "Review and submit" },
];

export function WizardLayout({
  currentStep,
  completedSteps,
  onStepChange,
  onBack,
  onNext,
  onCancel,
  canGoNext,
  isLastStep,
  children,
}: WizardLayoutProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Create New Job</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {steps[currentStepIndex]?.description}
              </p>
            </div>
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-1" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = step.id === currentStep;
              const isPast = index < currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (isPast || isCompleted) {
                      onStepChange(step.id);
                    }
                  }}
                  disabled={!isPast && !isCompleted && !isCurrent}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    isCurrent && "bg-primary text-primary-foreground shadow-sm",
                    !isCurrent &&
                      (isPast || isCompleted) &&
                      "hover:bg-muted cursor-pointer",
                    !isCurrent &&
                      !isPast &&
                      !isCompleted &&
                      "text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                      isCurrent && "bg-primary-foreground text-primary",
                      !isCurrent &&
                        isCompleted &&
                        "bg-green-500/10 text-green-600",
                      !isCurrent &&
                        !isCompleted &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="container max-w-3xl mx-auto px-6 py-8">{children}</div>
      </div>

      {/* Footer */}
      <div className="border-t bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button onClick={onNext} disabled={!canGoNext}>
              {isLastStep ? (
                "Create Job"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
