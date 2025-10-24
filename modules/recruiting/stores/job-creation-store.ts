import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateJobFormData } from "../schemas/job-creation";
import type {
  CompanySearchResult,
  CompanyDepartment,
  CompanyContact,
  AvailableUser,
  Workflow,
} from "../types";

export type WizardStep =
  | "basic"
  | "location"
  | "company"
  | "details"
  | "tags"
  | "review";

// Review metadata for display purposes
export interface ReviewMetadata {
  department?: CompanyDepartment;
  contact?: CompanyContact;
  recruiter?: AvailableUser;
  workflow?: Workflow;
  categoryName?: string;
}

interface JobCreationState {
  // Wizard state
  currentStep: WizardStep;
  completedSteps: WizardStep[];

  // Form data
  formData: Partial<CreateJobFormData>;
  selectedCompany: CompanySearchResult | null;
  reviewMetadata: ReviewMetadata;

  // Actions
  setCurrentStep: (step: WizardStep) => void;
  markStepComplete: (step: WizardStep) => void;
  updateFormData: (data: Partial<CreateJobFormData>) => void;
  setSelectedCompany: (company: CompanySearchResult | null) => void;
  setReviewMetadata: (metadata: Partial<ReviewMetadata>) => void;
  resetWizard: () => void;
  hasUnsavedChanges: () => boolean;
}

const initialState = {
  currentStep: "basic" as WizardStep,
  completedSteps: [] as WizardStep[],
  formData: {
    openings: 1,
    is_hot: false,
    type: "Hire" as const,
    country_code: "US",
    applications: [{ id: 6274 }],
    tags: [],
    user_groups: [],
    custom_fields: [],
    assigned_users: [],
  },
  selectedCompany: null,
  reviewMetadata: {},
};

export const useJobCreationStore = create<JobCreationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(step)
            ? state.completedSteps
            : [...state.completedSteps, step],
        })),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setSelectedCompany: (company) =>
        set((state) => ({
          selectedCompany: company,
          formData: {
            ...state.formData,
            company_id: company?.id,
            city: company?.address.city || "",
            state: company?.address.state || "",
            postal_code: company?.address.postal_code || "",
          },
        })),

      setReviewMetadata: (metadata) =>
        set((state) => ({
          reviewMetadata: { ...state.reviewMetadata, ...metadata },
        })),

      resetWizard: () => set(initialState),

      hasUnsavedChanges: () => {
        const state = get();
        return (
          state.completedSteps.length > 0 ||
          state.currentStep !== "basic" ||
          state.formData.title !== undefined ||
          state.selectedCompany !== null
        );
      },
    }),
    {
      name: "job-creation-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        formData: state.formData,
        selectedCompany: state.selectedCompany,
        reviewMetadata: state.reviewMetadata,
      }),
    }
  )
);
