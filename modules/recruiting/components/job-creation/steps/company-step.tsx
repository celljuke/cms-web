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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useSearchCompanies } from "../../../hooks/use-search-companies";
import { useCompanyDepartments } from "../../../hooks/use-company-departments";
import { useCompanyContacts } from "../../../hooks/use-company-contacts";
import { useAvailableUsers } from "../../../hooks/use-available-users";
import { useWorkflows } from "../../../hooks/use-workflows";
import { useEffect, useState } from "react";
import { Building2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const companySchema = z.object({
  company_id: z.number().min(1, "Company is required"),
  department_id: z.number().optional(),
  contact_id: z.number().optional(),
  recruiter_id: z.number().min(1, "Recruiter is required"),
  category: z.string().optional(),
  workflow_id: z.number().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyStepProps {
  onValidationChange: (isValid: boolean) => void;
}

const CATEGORIES = [
  { id: 1, name: "Accounting/Finance" },
  { id: 2, name: "Administrative" },
  { id: 3, name: "Architecture/Engineering" },
  { id: 4, name: "Art/Media/Design" },
  { id: 5, name: "Banking/Loans" },
  { id: 6, name: "Biotech/Pharmaceutical" },
  { id: 7, name: "Computer/Software" },
  { id: 8, name: "Construction/Facilities" },
  { id: 9, name: "Customer Service" },
  { id: 10, name: "Education" },
  { id: 11, name: "General Labor" },
  { id: 12, name: "Government/Military" },
  { id: 13, name: "Healthcare" },
  { id: 14, name: "Hospitality/Travel" },
  { id: 15, name: "Human Resources" },
  { id: 16, name: "Information Technology" },
  { id: 17, name: "Law Enforcement/Security" },
  { id: 18, name: "Legal" },
  { id: 19, name: "Manufacturing" },
  { id: 20, name: "Marketing/Public Relations" },
  { id: 21, name: "Real Estate" },
  { id: 22, name: "Restaurant/Food Service" },
  { id: 23, name: "Retail" },
  { id: 24, name: "Sales" },
  { id: 25, name: "Science/Research" },
  { id: 26, name: "Telecommunications" },
  { id: 27, name: "Transportation/Logistics" },
  { id: 28, name: "Volunteering/Non-Profit" },
  { id: 29, name: "Writing/Editing" },
];

export function CompanyStep({ onValidationChange }: CompanyStepProps) {
  const {
    formData,
    updateFormData,
    selectedCompany,
    setSelectedCompany,
    setReviewMetadata,
  } = useJobCreationStore();
  const [showSearch, setShowSearch] = useState(!selectedCompany);

  const {
    companies,
    isLoading: isSearching,
    query,
    setQuery,
  } = useSearchCompanies();
  const { data: departments, isLoading: isDepartmentsLoading } =
    useCompanyDepartments(selectedCompany?.id);
  const { data: contacts, isLoading: isContactsLoading } = useCompanyContacts(
    selectedCompany?.id
  );
  const { data: users, isLoading: isUsersLoading } = useAvailableUsers();
  const { data: workflows, isLoading: isWorkflowsLoading } = useWorkflows();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      company_id: formData.company_id,
      department_id: formData.department_id,
      contact_id: formData.contact_id,
      recruiter_id: formData.recruiter_id,
      category: formData.category || "",
      workflow_id: formData.workflow_id,
    },
  });

  const { watch, formState, setValue } = form;

  useEffect(() => {
    if (selectedCompany) {
      setValue("company_id", selectedCompany.id);
    }
  }, [selectedCompany, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      updateFormData(value as Partial<CompanyFormData>);

      // Update review metadata with selected items
      if (value.department_id && departments) {
        const dept = departments.find((d) => d.id === value.department_id);
        if (dept) setReviewMetadata({ department: dept });
      }

      if (value.contact_id && contacts) {
        const contact = contacts.find(
          (c) => parseInt(c.id) === value.contact_id
        );
        if (contact) setReviewMetadata({ contact });
      }

      if (value.recruiter_id && users) {
        const recruiter = users.find((u) => u.id === value.recruiter_id);
        if (recruiter) setReviewMetadata({ recruiter });
      }

      if (value.workflow_id && workflows) {
        const workflow = workflows.find((w) => w.id === value.workflow_id);
        if (workflow) setReviewMetadata({ workflow });
      }

      if (value.category) {
        const categoryId = parseInt(value.category);
        const category = CATEGORIES.find((c) => c.id === categoryId);
        if (category) setReviewMetadata({ categoryName: category.name });
      }
    });
    return () => subscription.unsubscribe();
  }, [
    watch,
    updateFormData,
    setReviewMetadata,
    departments,
    contacts,
    users,
    workflows,
  ]);

  useEffect(() => {
    onValidationChange(formState.isValid);
  }, [formState.isValid, onValidationChange]);

  const handleSelectCompany = (company: (typeof companies)[0]) => {
    setSelectedCompany(company);
    setShowSearch(false);
    setQuery("");
  };

  const handleRemoveCompany = () => {
    setSelectedCompany(null);
    setValue("company_id", 0);
    setValue("department_id", undefined);
    setValue("contact_id", undefined);
    setShowSearch(true);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Company Search */}
        <Card className="p-6 shadow-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>
                Company <span className="text-destructive">*</span>
              </FormLabel>
              {selectedCompany && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCompany}
                >
                  <X className="h-4 w-4 mr-1" />
                  Change
                </Button>
              )}
            </div>

            {selectedCompany && !showSearch ? (
              <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{selectedCompany.name}</div>
                  {selectedCompany.address && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {[
                        selectedCompany.address.city,
                        selectedCompany.address.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  )}
                  {selectedCompany.website && (
                    <div className="text-sm text-muted-foreground">
                      {selectedCompany.website}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for a company..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {isSearching && query.length >= 2 && (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                )}

                {!isSearching && companies.length > 0 && (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {companies.map((company) => (
                      <button
                        key={company.id}
                        type="button"
                        onClick={() => handleSelectCompany(company)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{company.name}</div>
                          {company.address && (
                            <div className="text-sm text-muted-foreground">
                              {[company.address.city, company.address.state]
                                .filter(Boolean)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!isSearching &&
                  query.length >= 2 &&
                  companies.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No companies found. Try a different search term.
                    </div>
                  )}

                {query.length < 2 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Type at least 2 characters to search for companies
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Company Details */}
        {selectedCompany && (
          <Card className="p-6 shadow-none">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="department_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full [&>span]:truncate">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isDepartmentsLoading ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              Loading...
                            </div>
                          ) : departments && departments.length > 0 ? (
                            departments.map((dept) => (
                              <SelectItem
                                key={dept.id}
                                value={dept.id.toString()}
                              >
                                {dept.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">
                              No departments found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_id"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Contact</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isContactsLoading ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              Loading...
                            </div>
                          ) : contacts && contacts.length > 0 ? (
                            contacts.map((contact) => (
                              <SelectItem
                                key={contact.id}
                                value={contact.id.toString()}
                                className="truncate"
                              >
                                {contact.first_name} {contact.last_name}
                                {contact.title && ` - ${contact.title}`}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">
                              No contacts found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="recruiter_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Recruiter <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value, 10))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full [&>span]:truncate">
                            <SelectValue placeholder="Select recruiter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isUsersLoading ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              Loading...
                            </div>
                          ) : users && users.length > 0 ? (
                            users.map((user) => (
                              <SelectItem
                                key={user.id}
                                value={user.id.toString()}
                              >
                                {user.name} ({user.email})
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">
                              No users found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full [&>span]:truncate">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="workflow_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(parseInt(value, 10))
                      }
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full [&>span]:truncate">
                          <SelectValue placeholder="Select workflow" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isWorkflowsLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            Loading...
                          </div>
                        ) : workflows && workflows.length > 0 ? (
                          workflows.map((workflow) => (
                            <SelectItem
                              key={workflow.id}
                              value={workflow.id.toString()}
                            >
                              {workflow.title}
                              {workflow.is_default && " (Default)"}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">
                            No workflows found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        )}
      </form>
    </Form>
  );
}
