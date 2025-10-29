"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Sparkles, Loader2, User, Briefcase, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  useCatsJobDetail,
  useGenerateAIScreening,
  useEnableAgentVIP,
} from "../hooks";
import { RecruiterSelect } from "./recruiter-select";
import type { EnableAgentVIPPayload, CatsJobDetail } from "../types";
import { toast } from "sonner";

const enableAgentVIPSchema = z.object({
  recruiter_id: z.number().nullable(),
  description: z.string().min(1, "Job description is required"),
  screening_email: z.string().min(1, "Screening email is required"),
  criteria: z.string().min(1, "Criteria is required"),
});

type EnableAgentVIPFormData = z.infer<typeof enableAgentVIPSchema>;

interface EnableAgentVIPSheetProps {
  jobId: number | null;
  jobTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnableAgentVIPSheet({
  jobId,
  jobTitle,
  open,
  onOpenChange,
}: EnableAgentVIPSheetProps) {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const { data: catsJob, isLoading: isCatsLoading } = useCatsJobDetail(jobId);
  const { generateScreening } = useGenerateAIScreening();
  const { enableAgentVIP, isEnabling } = useEnableAgentVIP();

  const form = useForm<EnableAgentVIPFormData>({
    resolver: zodResolver(enableAgentVIPSchema),
    defaultValues: {
      recruiter_id: null,
      description: "",
      screening_email: "",
      criteria: "",
    },
  });

  // Reset form when sheet opens or jobId changes
  useEffect(() => {
    if (open && jobId) {
      form.reset({
        recruiter_id: null,
        description: "",
        screening_email: "",
        criteria: "",
      });
      setIsGeneratingAI(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, jobId]);

  // Auto-populate description and generate AI screening when CATS job data is loaded
  useEffect(() => {
    if (catsJob && open) {
      // Set the description from CATS job data
      form.setValue("description", catsJob.description);

      // Auto-generate AI screening
      if (!isGeneratingAI) {
        handleGenerateAI();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catsJob, open]);

  const handleGenerateAI = async () => {
    if (!catsJob) return;

    setIsGeneratingAI(true);
    try {
      const result = await generateScreening(
        catsJob.description,
        catsJob.title
      );

      form.setValue("screening_email", result.screening_email_html);
      form.setValue("criteria", result.criteria_html);
      toast.success("AI screening generated successfully");
    } catch (error) {
      console.error("Failed to generate AI screening:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (data: EnableAgentVIPFormData) => {
    if (!catsJob || !jobId) return;

    // Build the payload according to the API requirements
    const payload: EnableAgentVIPPayload = {
      job_id: jobId,
      display_name: catsJob.title,
      description: data.description,
      screening_email: data.screening_email,
      criteria: data.criteria,
      title: catsJob.title,
      location: catsJob.location,
      country_code: catsJob.country_code,
      is_hot: catsJob.is_hot,
      salary: catsJob.salary,
      remote_type: catsJob.remote_type,
      max_rate: catsJob.max_rate,
      duration: catsJob.duration,
      start_date: catsJob.start_date,
      openings: catsJob.openings,
      status: catsJob.status,
      status_id: catsJob.status_id,
      date_created: catsJob.date_created,
      date_modified: catsJob.date_modified,
      category_name: catsJob.category_name,
      type: catsJob.type,
      is_active: 1,
      company: catsJob.company,
      application_forms: catsJob.application_forms,
      owner: catsJob.owner,
      recruiter: data.recruiter_id
        ? {
            id: data.recruiter_id,
            first_name: "", // Will be populated by backend
            last_name: "",
          }
        : catsJob.recruiter,
      created_at: null,
      updated_at: null,
      created_by: null,
    };

    try {
      await enableAgentVIP(payload);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Failed to enable AgentVIP:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="p-6 space-y-1">
          <SheetTitle className="text-2xl font-bold">{jobTitle}</SheetTitle>
          <SheetDescription className="text-base">{jobId}</SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6">
          <div className="space-y-6">
            {isCatsLoading || isGeneratingAI ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium">
                    {isCatsLoading
                      ? "Loading job details..."
                      : "Generating AI screening..."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments
                  </p>
                </div>
              </div>
            ) : !catsJob ? (
              <div className="text-center py-12 text-muted-foreground">
                Failed to load job details
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  {/* Job Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Job Description{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter job description..."
                            onAiRephrase={handleGenerateAI}
                            isRephrasing={isGeneratingAI}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Screening Email */}
                  <FormField
                    control={form.control}
                    name="screening_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Screening Email{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter screening email content..."
                            onAiRephrase={handleGenerateAI}
                            isRephrasing={isGeneratingAI}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Screening Criteria */}
                  <FormField
                    control={form.control}
                    name="criteria"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Screening Criteria{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter screening criteria..."
                            onAiRephrase={handleGenerateAI}
                            isRephrasing={isGeneratingAI}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Assign Recruiter to Job */}
                  <FormField
                    control={form.control}
                    name="recruiter_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign Recruiter to Job</FormLabel>
                        <FormControl>
                          <RecruiterSelect
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      disabled={isEnabling}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isEnabling || isGeneratingAI}
                      className="gap-2"
                    >
                      {isEnabling ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enabling...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Enable AgentVIP
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
