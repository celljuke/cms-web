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
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useEffect, useState, useRef } from "react";
import { useAvailableUsers } from "../../../hooks/use-available-users";
import { Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VList } from "virtua";

const basicInfoSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  external_id: z.string().optional(),
  type: z.enum(["Hire", "Contract to Hire", "Contract", "Freelance"]),
  openings: z.number().min(1, "At least 1 opening is required"),
  remote_type: z.string().optional(),
  is_hot: z.boolean(),
  recruiter_id: z.number().optional(),
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

export function BasicInfoStep({ onValidationChange }: BasicInfoStepProps) {
  const { formData, updateFormData } = useJobCreationStore();
  const [recruiterSearch, setRecruiterSearch] = useState("");
  const [selectedRecruiterId, setSelectedRecruiterId] = useState<
    number | undefined
  >(formData.recruiter_id);
  const [showRecruitersList, setShowRecruitersList] = useState(false);
  const recruitersListRef = useRef<HTMLDivElement>(null);

  const { data: users, isLoading: isUsersLoading } = useAvailableUsers();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        recruitersListRef.current &&
        !recruitersListRef.current.contains(event.target as Node)
      ) {
        setShowRecruitersList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    },
  });

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
    setShowRecruitersList(false);
  };

  const handleRemoveRecruiter = () => {
    setSelectedRecruiterId(undefined);
    form.setValue("recruiter_id", undefined);
  };

  const { watch, formState } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      // Convert "none" to empty string for remote_type
      const processedValue = {
        ...value,
        remote_type: value.remote_type === "none" ? "" : value.remote_type,
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
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Describe the role, responsibilities, and requirements..."
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
                      <div className="relative" ref={recruitersListRef}>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search recruiters..."
                            value={recruiterSearch}
                            onChange={(e) => setRecruiterSearch(e.target.value)}
                            onFocus={() => setShowRecruitersList(true)}
                            className="pl-9"
                          />
                        </div>

                        {showRecruitersList && (
                          <>
                            {isUsersLoading ? (
                              <div className="absolute z-50 w-full mt-2 border rounded-md bg-background shadow-lg">
                                <div className="p-2 space-y-2">
                                  {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-16 w-full" />
                                  ))}
                                </div>
                              </div>
                            ) : filteredUsers && filteredUsers.length > 0 ? (
                              <div className="absolute z-50 w-full mt-2 border rounded-md bg-background shadow-lg">
                                <div className="p-1">
                                  <VList style={{ height: "300px" }}>
                                    {filteredUsers.map((user) => (
                                      <button
                                        key={user.id}
                                        type="button"
                                        onClick={() =>
                                          handleSelectRecruiter(user.id)
                                        }
                                        className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors text-left"
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
                                  </VList>
                                </div>
                                {recruiterSearch && (
                                  <div className="border-t p-2 text-xs text-muted-foreground text-center">
                                    Showing {filteredUsers.length} of{" "}
                                    {users?.length || 0} recruiters
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="absolute z-50 w-full mt-2 border rounded-md bg-background shadow-lg">
                                <div className="text-center py-8 text-sm text-muted-foreground">
                                  {recruiterSearch
                                    ? "No recruiters found"
                                    : "No recruiters available"}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
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
