"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function RecruitingJobDetail() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              Recruiting Job Detail
            </h1>
            <p className="text-muted-foreground">
              View the details of a recruiting job
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/recruiting")}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Recruiting Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
