import { RecruitingDashboard } from "@/modules/recruiting/components/recruiting-dashboard";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function RecruitingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <RecruitingDashboard />
    </Suspense>
  );
}
