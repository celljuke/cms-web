"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJobCreationStore } from "../../stores/job-creation-store";
import { useCreateJob } from "../../hooks/use-create-job";
import { WizardLayout } from "./wizard-layout";
import {
  BasicInfoStep,
  LocationStep,
  CompanyStep,
  DetailsStep,
  TagsStep,
  ReviewStep,
} from "./steps";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { WizardStep } from "../../stores/job-creation-store";

interface JobCreationWizardProps {
  onClose: () => void;
}

const stepOrder: WizardStep[] = [
  "basic",
  "location",
  "company",
  "details",
  "tags",
  "review",
];

export function JobCreationWizard({ onClose }: JobCreationWizardProps) {
  const router = useRouter();
  const {
    currentStep,
    completedSteps,
    formData,
    setCurrentStep,
    markStepComplete,
    resetWizard,
    hasUnsavedChanges,
  } = useJobCreationStore();

  const [stepValid, setStepValid] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const createJobMutation = useCreateJob();

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const isLastStep = currentStepIndex === stepOrder.length - 1;

  const handleNext = async () => {
    if (!stepValid) return;

    markStepComplete(currentStep);

    if (isLastStep) {
      // Submit the form
      try {
        await createJobMutation.mutateAsync(formData as any);
        resetWizard();
        onClose();
      } catch (error) {
        console.error("Failed to create job:", error);
      }
    } else {
      // Move to next step
      const nextStep = stepOrder[currentStepIndex + 1];
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = stepOrder[currentStepIndex - 1];
      setCurrentStep(prevStep);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      setShowCancelDialog(true);
    } else {
      resetWizard();
      onClose();
    }
  };

  const handleConfirmCancel = (action: "discard" | "continue") => {
    setShowCancelDialog(false);
    if (action === "discard") {
      resetWizard();
      onClose();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "basic":
        return <BasicInfoStep onValidationChange={setStepValid} />;
      case "location":
        return <LocationStep onValidationChange={setStepValid} />;
      case "company":
        return <CompanyStep onValidationChange={setStepValid} />;
      case "details":
        return <DetailsStep onValidationChange={setStepValid} />;
      case "tags":
        return <TagsStep onValidationChange={setStepValid} />;
      case "review":
        return <ReviewStep onValidationChange={setStepValid} />;
      default:
        return null;
    }
  };

  return (
    <>
      <WizardLayout
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepChange={setCurrentStep}
        onBack={handleBack}
        onNext={handleNext}
        onCancel={handleCancel}
        canGoNext={stepValid && !createJobMutation.isPending}
        isLastStep={isLastStep}
      >
        {renderStep()}
      </WizardLayout>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Would you like to continue editing later
              or discard your changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleConfirmCancel("continue")}>
              Continue Editing Later
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleConfirmCancel("discard")}
              className="bg-destructive hover:bg-destructive/90"
            >
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
