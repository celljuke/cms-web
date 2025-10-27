"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useRephraseField } from "../../../hooks/use-rephrase-field";
import { useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

const detailsSchema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  salary: z.string().optional(),
  max_rate: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
  auto_close_enabled: z.boolean().optional(),
  auto_close_datetime: z.date().optional(),
  time_zone: z.string().optional(),
});

const TIMEZONES = [
  "Pacific Standard Time (PST)",
  "Mountain Standard Time (MST)",
  "Central Standard Time (CST)",
  "Eastern Standard Time (EST)",
];

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export function DetailsStep({ onValidationChange }: DetailsStepProps) {
  const { formData, updateFormData } = useJobCreationStore();
  const rephraseField = useRephraseField();

  // Parse existing datetime if available
  const existingDateTime = formData.job_close_schedule_time
    ? new Date(formData.job_close_schedule_time)
    : undefined;

  const form = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      start_date: formData.start_date || "",
      salary: formData.salary || "",
      max_rate: formData.max_rate || "",
      duration: formData.duration || "",
      notes: formData.notes || "",
      auto_close_enabled: Boolean(formData.job_close_schedule_time),
      auto_close_datetime: existingDateTime,
      time_zone: formData.time_zone || "",
    },
  });

  const { watch, formState } = form;
  const autoCloseEnabled = form.watch("auto_close_enabled");

  const handleRephraseNotes = async () => {
    const currentNotes = form.getValues("notes");
    if (!currentNotes) {
      toast.error("Please enter notes first");
      return;
    }

    try {
      const result = await rephraseField.mutateAsync({
        fieldName: "notes",
        fieldData: currentNotes,
      });
      form.setValue("notes", result.rephrased);
      toast.success("Notes rephrased successfully!");
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      // Convert auto_close_datetime to ISO string for job_close_schedule_time
      const jobCloseScheduleTime = value.auto_close_datetime
        ? value.auto_close_datetime.toISOString()
        : "";

      const processedValue = {
        ...value,
        job_close_schedule_time: jobCloseScheduleTime,
      };
      updateFormData(processedValue as any);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  useEffect(() => {
    onValidationChange(formState.isValid);
  }, [formState.isValid, onValidationChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card className="p-6 shadow-none">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Date <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                      placeholder="Select start date"
                      disablePastDates
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Expected start date for the position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $50,000 - $70,000" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Salary range or amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $35/hour" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Maximum hourly rate
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 6 months" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Contract duration (if applicable)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internal Notes</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Add any internal notes about this job..."
                      onAiRephrase={handleRephraseNotes}
                      isRephrasing={rephraseField.isPending}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    These notes are for internal use only
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Auto Close Job */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Auto Close Job</h3>
              <p className="text-sm text-muted-foreground">
                Automatically close this job at a scheduled time
              </p>
            </div>

            <FormField
              control={form.control}
              name="auto_close_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Automatically close job at scheduled time
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {autoCloseEnabled && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="auto_close_datetime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schedule Close Date & Time</FormLabel>
                        <FormControl>
                          <DatePicker
                            date={field.value}
                            onSelect={field.onChange}
                            placeholder="Select date and time"
                            withTime
                            disablePastDates
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time_zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIMEZONES.map((tz) => (
                              <SelectItem key={tz} value={tz}>
                                {tz}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </form>
    </Form>
  );
}
