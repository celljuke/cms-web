"use client";

import { Sparkles } from "lucide-react";
import { assistants } from "../constants/assistants";
import { AssistantCard } from "./assistant-card";

export function AssistantSelection() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
            AI-Powered
          </span>
        </div>
        <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-balance tracking-tight">
          Select Your Intelligent Assistant
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-pretty">
          Unlock AI-Driven Innovation to Streamline Your Enterprise Workflow for
          Hiring and Sales Strategies
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {assistants.map((assistant, index) => (
          <div
            key={assistant.id}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            <AssistantCard assistant={assistant} index={index} />
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-sm text-neutral-400 dark:text-neutral-500">
          Need help choosing? Our team is here to guide you through the
          selection process.
        </p>
      </div>
    </main>
  );
}
