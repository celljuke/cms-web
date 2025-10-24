"use client";

import { useRouter } from "next/navigation";
import { JobCreationWizard } from "@/modules/recruiting/components/job-creation/job-creation-wizard";

export default function NewJobPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/recruiting");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <JobCreationWizard onClose={handleClose} />
    </div>
  );
}
