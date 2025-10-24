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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useEffect, useState } from "react";
import { useAvailableUsers } from "../../../hooks/use-available-users";
import { Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const basicInfoSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  external_id: z.string().optional(),
  type: z.enum(["Hire", "Contract to Hire", "Contract", "Freelance"]),
  openings: z.number().min(1, "At least 1 opening is required"),
  remote_type: z.string().optional(),
  is_hot: z.boolean(),
  recruiter_id: z.number().optional(),
  auto_close_enabled: z.boolean().optional(),
  auto_close_datetime: z.date().optional(),
  time_zone: z.string().optional(),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoStepProps {
  onValidationChange: (isValid: boolean) => void;
}

const JOB_TYPES = [
  "Hire",
  "Contract to Hire",
  "Contract",
  "Freelance",
] as const;
const REMOTE_TYPES = ["COVID-19", "Fully remote", "WFH Flexible"];

const TIMEZONES = [
  "Pacific Standard Time (PST)",
  "Mountain Standard Time (MST)",
  "Central Standard Time (CST)",
  "Eastern Standard Time (EST)",
];

export function BasicInfoStep({ onValidationChange }: BasicInfoStepProps) {
  const { formData, updateFormData } = useJobCreationStore();
  const [recruiterSearch, setRecruiterSearch] = useState("");
  const [selectedRecruiterId, setSelectedRecruiterId] = useState<
    number | undefined
  >(formData.recruiter_id);

  const { data: users, isLoading: isUsersLoading } = useAvailableUsers();

  // Parse existing datetime if available
  const existingDateTime = formData.job_close_schedule_time
    ? new Date(formData.job_close_schedule_time)
    : undefined;

  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      external_id: formData.external_id || "",
      type: formData.type || "Hire",
      openings: formData.openings || 1,
      remote_type: formData.remote_type || "none",
      is_hot: formData.is_hot || false,
      recruiter_id: formData.recruiter_id,
      auto_close_enabled: Boolean(formData.job_close_schedule_time),
      auto_close_datetime: existingDateTime,
      time_zone: formData.time_zone || "",
    },
  });

  const autoCloseEnabled = form.watch("auto_close_enabled");

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(recruiterSearch.toLowerCase())
  );

  const selectedRecruiter = users?.find(
    (user) => user.id === selectedRecruiterId
  );

  const handleSelectRecruiter = (userId: number) => {
    setSelectedRecruiterId(userId);
    form.setValue("recruiter_id", userId);
    setRecruiterSearch("");
  };

  const handleRemoveRecruiter = () => {
    setSelectedRecruiterId(undefined);
    form.setValue("recruiter_id", undefined);
  };

  const { watch, formState } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      // Convert "none" to empty string for remote_type
      // Convert auto_close_datetime to ISO string for job_close_schedule_time
      const jobCloseScheduleTime = value.auto_close_datetime
        ? value.auto_close_datetime.toISOString()
        : "";

      const processedValue = {
        ...value,
        remote_type: value.remote_type === "none" ? "" : value.remote_type,
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job Description <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the role, responsibilities, and requirements..."
                      className="min-h-[200px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of the job position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Job Type <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Number of Openings{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="remote_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remote Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select remote type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {REMOTE_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="external_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>External ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 16695791" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_hot"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Hot Job</FormLabel>
                    <FormDescription>
                      Mark this job as a priority position
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Job Assignments */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Job Assignments</h3>
              <p className="text-sm text-muted-foreground">
                Assign a recruiter to manage this job
              </p>
            </div>

            <FormField
              control={form.control}
              name="recruiter_id"
              render={() => (
                <FormItem>
                  <FormLabel>Assign Recruiter</FormLabel>
                  <div className="space-y-3">
                    {!selectedRecruiter && (
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search recruiters..."
                          value={recruiterSearch}
                          onChange={(e) => setRecruiterSearch(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    )}

                    {selectedRecruiter ? (
                      <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {selectedRecruiter.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {selectedRecruiter.name}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {selectedRecruiter.email}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveRecruiter}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        {isUsersLoading && recruiterSearch && (
                          <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <Skeleton key={i} className="h-16 w-full" />
                            ))}
                          </div>
                        )}

                        {!isUsersLoading &&
                          recruiterSearch &&
                          filteredUsers &&
                          filteredUsers.length > 0 && (
                            <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md">
                              {filteredUsers.map((user) => (
                                <button
                                  key={user.id}
                                  type="button"
                                  onClick={() => handleSelectRecruiter(user.id)}
                                  className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                                >
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">
                                      {user.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground truncate">
                                      {user.email}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}

                        {!isUsersLoading &&
                          recruiterSearch &&
                          filteredUsers &&
                          filteredUsers.length === 0 && (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                              No recruiters found
                            </div>
                          )}

                        {!recruiterSearch && (
                          <div className="text-center py-8 text-sm text-muted-foreground">
                            No recruiter selected yet. Choose a recruiter from
                            the search above.
                          </div>
                        )}
                      </>
                    )}
                  </div>
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
