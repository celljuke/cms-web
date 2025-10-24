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
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useEffect } from "react";
import { format } from "date-fns";

const detailsSchema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  salary: z.string().optional(),
  max_rate: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
});

type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export function DetailsStep({ onValidationChange }: DetailsStepProps) {
  const { formData, updateFormData } = useJobCreationStore();

  const form = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      start_date: formData.start_date || "",
      salary: formData.salary || "",
      max_rate: formData.max_rate || "",
      duration: formData.duration || "",
      notes: formData.notes || "",
    },
  });

  const { watch, formState } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value as Partial<DetailsFormData>);
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
                    <Textarea
                      placeholder="Add any internal notes about this job..."
                      className="min-h-[120px] resize-none"
                      {...field}
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
      </form>
    </Form>
  );
}
