"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useLocationData } from "../../../hooks/use-location-data";
import { useEffect } from "react";

const locationSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().optional(),
  country_code: z.string().min(1, "Country code is required"),
});

type LocationFormData = z.infer<typeof locationSchema>;

interface LocationStepProps {
  onValidationChange: (isValid: boolean) => void;
}

export function LocationStep({ onValidationChange }: LocationStepProps) {
  const { formData, updateFormData } = useJobCreationStore();

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      city: formData.city || "",
      state: formData.state || "",
      postal_code: formData.postal_code || "",
      country_code: formData.country_code || "US",
    },
  });

  const { watch, formState } = form;

  // Use location data hook
  const {
    countryOptions,
    stateOptions,
    cityOptions,
    handleCountryChange,
    handleStateChange,
    setSelectedCountryCode,
    setSelectedStateCode,
  } = useLocationData(formData.country_code || "US");

  // Set US as default on mount if no country is selected
  useEffect(() => {
    if (!formData.country_code) {
      form.setValue("country_code", "US");
    }
  }, []);

  // Initialize state codes from form data
  useEffect(() => {
    if (formData.country_code) {
      setSelectedCountryCode(formData.country_code);
    }
    if (formData.state) {
      setSelectedStateCode(formData.state);
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value as Partial<LocationFormData>);
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
              name="country_code"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Country <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <SearchableSelect
                      options={countryOptions}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountryChange(
                          value,
                          (v) => form.setValue("state", v),
                          (v) => form.setValue("city", v)
                        );
                      }}
                      placeholder="Select country"
                      searchPlaceholder="Search country..."
                      emptyText="No country found."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      State <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        options={stateOptions}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleStateChange(value, (v) =>
                            form.setValue("city", v)
                          );
                        }}
                        placeholder="Select state"
                        searchPlaceholder="Search state..."
                        emptyText="No state found."
                        disabled={stateOptions.length === 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      City <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <SearchableSelect
                        options={cityOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select city"
                        searchPlaceholder="Search city..."
                        emptyText="No city found."
                        disabled={cityOptions.length === 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 94105" {...field} />
                  </FormControl>
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
