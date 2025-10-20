"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function RecruitingDashboard() {
  const [tab, setTab] = useState("jobs");
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Recruiting Dashboard</h1>
        <div className="text-muted-foreground">
          Manage your job orders and candidates
        </div>
      </div>
      <div className="mt-10">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>
            {tab === "jobs" && (
              <Button variant="default">
                <PlusIcon className="w-4 h-4" />
                Create New Job
              </Button>
            )}
          </div>
          <div className="mt-10">
            <TabsContent value="jobs">
              <div>Jobs</div>
            </TabsContent>
            <TabsContent value="candidates">
              <div>Candidates</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
