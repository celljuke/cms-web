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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

const tagsSchema = z.object({
  tags: z.array(z.string()),
  user_groups: z.array(z.string()),
  applications: z.array(z.object({ id: z.number() })),
});

type TagsFormData = z.infer<typeof tagsSchema>;

interface TagsStepProps {
  onValidationChange: (isValid: boolean) => void;
}

const APPLICATION_OPTIONS = {
  6274: "General",
  6275: "EEO-1 Compliance Questionnaire",
};

export function TagsStep({ onValidationChange }: TagsStepProps) {
  const { formData, updateFormData } = useJobCreationStore();
  const [tagInput, setTagInput] = useState("");
  const [groupInput, setGroupInput] = useState("");

  const form = useForm<TagsFormData>({
    resolver: zodResolver(tagsSchema),
    defaultValues: {
      tags: formData.tags || [],
      user_groups: formData.user_groups || [],
      applications: formData.applications || [{ id: 6274 }],
    },
  });

  const { watch, formState, setValue } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value as Partial<TagsFormData>);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  useEffect(() => {
    onValidationChange(true); // All fields are optional
  }, [onValidationChange]);

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags");
      if (!currentTags.includes(tagInput.trim())) {
        setValue("tags", [...currentTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const addGroup = () => {
    if (groupInput.trim()) {
      const currentGroups = form.getValues("user_groups");
      if (!currentGroups.includes(groupInput.trim())) {
        setValue("user_groups", [...currentGroups, groupInput.trim()]);
      }
      setGroupInput("");
    }
  };

  const removeGroup = (group: string) => {
    const currentGroups = form.getValues("user_groups");
    setValue(
      "user_groups",
      currentGroups.filter((g) => g !== group)
    );
  };

  const toggleApplication = (appId: number) => {
    const currentApps = form.getValues("applications");
    const exists = currentApps.some((app) => app.id === appId);
    if (exists) {
      setValue(
        "applications",
        currentApps.filter((app) => app.id !== appId)
      );
    } else {
      setValue("applications", [...currentApps, { id: appId }]);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Tags */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div>
              <FormLabel>Tags</FormLabel>
              <FormDescription className="text-xs mt-1">
                Add tags to organize and categorize this job
              </FormDescription>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" onClick={addTag} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {form.watch("tags").length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.watch("tags").map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* User Groups */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div>
              <FormLabel>User Groups</FormLabel>
              <FormDescription className="text-xs mt-1">
                Assign user groups for access control
              </FormDescription>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add user groups..."
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addGroup();
                  }
                }}
              />
              <Button type="button" onClick={addGroup} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {form.watch("user_groups").length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.watch("user_groups").map((group) => (
                  <Badge key={group} variant="secondary" className="gap-1">
                    {group}
                    <button
                      type="button"
                      onClick={() => removeGroup(group)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Applications */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div>
              <FormLabel>Applications</FormLabel>
              <FormDescription className="text-xs mt-1">
                Select which application forms to include
              </FormDescription>
            </div>

            <div className="space-y-3">
              {Object.entries(APPLICATION_OPTIONS).map(([id, name]) => {
                const appId = parseInt(id, 10);
                const isChecked = form
                  .watch("applications")
                  .some((app) => app.id === appId);

                return (
                  <div
                    key={id}
                    className="flex items-center space-x-2 rounded-lg border p-3"
                  >
                    <Checkbox
                      id={`app-${id}`}
                      checked={isChecked}
                      onCheckedChange={() => toggleApplication(appId)}
                    />
                    <label
                      htmlFor={`app-${id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
}
