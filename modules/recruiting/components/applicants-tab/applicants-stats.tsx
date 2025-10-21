import { AlertCircle, Users, Star } from "lucide-react";

interface ApplicantsStatsProps {
  needsAttention: number;
  interviews: number;
  qualified: number;
  others: number;
}

export function ApplicantsStats({
  needsAttention,
  interviews,
  qualified,
  others,
}: ApplicantsStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Needs Attention</p>
            <p className="text-2xl font-bold">{needsAttention}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Interviews</p>
            <p className="text-2xl font-bold">{interviews}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Star className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Qualified</p>
            <p className="text-2xl font-bold">{qualified}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Others</p>
            <p className="text-2xl font-bold">{others}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
