"use client";

import { useRouter } from "next/navigation";
import type { Assistant } from "../constants/assistants";

interface AssistantCardProps {
  assistant: Assistant;
  index: number;
}

export function AssistantCard({ assistant, index }: AssistantCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(assistant.path);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-transparent transition-all duration-500 text-left overflow-hidden hover:shadow-2xl hover:shadow-neutral-900/10 dark:hover:shadow-black/50 hover:-translate-y-2 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${assistant.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Animated gradient border */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${assistant.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
        style={{ padding: "2px" }}
      >
        <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-3xl" />
      </div>

      {/* Badge */}
      {assistant.badge && (
        <div className="absolute top-6 right-6 z-10">
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-semibold bg-gradient-to-r ${assistant.gradient} text-white shadow-lg`}
          >
            {assistant.badge}
          </span>
        </div>
      )}

      {/* Icon with dynamic gradient background */}
      <div className="relative mb-8">
        <div
          className={`absolute inset-0 ${assistant.accentColor} dark:opacity-30 rounded-2xl blur-2xl opacity-50`}
        />
        <div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${assistant.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          {assistant.icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-900 group-hover:to-neutral-600 dark:group-hover:from-neutral-100 dark:group-hover:to-neutral-400 transition-all duration-300">
          {assistant.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {assistant.description}
        </p>
      </div>

      {/* CTA with arrow */}
      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
        <span>Get started</span>
        <svg
          className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-tl ${assistant.gradient} opacity-5 dark:opacity-10 rounded-tl-full`}
        />
      </div>
    </div>
  );
}
