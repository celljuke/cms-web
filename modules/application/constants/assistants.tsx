import type React from "react";
import { Users, TrendingUp, Brain } from "lucide-react";

export interface Assistant {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  badge?: string;
  path: string;
}

export const assistants: Assistant[] = [
  {
    id: "recruiting",
    title: "Recruiting Intelligence",
    description:
      "Automated candidate screening, intelligent workflows, and pipeline analytics",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-blue-500 via-cyan-500 to-teal-400",
    accentColor: "bg-blue-500/10",
    badge: "Popular",
    path: "/recruiting",
  },
  {
    id: "sales",
    title: "Sales Intelligence",
    description:
      "Lead detection, prospect identification, and sales pipeline management",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    accentColor: "bg-violet-500/10",
    path: "/sales",
  },
  {
    id: "analytics",
    title: "Analytics Intelligence",
    description:
      "Business metrics, predictive analytics, and data-driven insights",
    icon: <Brain className="w-8 h-8" />,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    accentColor: "bg-emerald-500/10",
    badge: "New",
    path: "/analytics",
  },
];
