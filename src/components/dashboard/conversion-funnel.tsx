"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Lead } from "@/lib/types";

export interface ConversionFunnelProps {
  leads: Lead[];
}

const stages = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "proposal", label: "Proposal" },
  { key: "won", label: "Won" },
];

export function ConversionFunnel({ leads }: ConversionFunnelProps) {
  // Count leads at each stage
  const stageCounts = stages.map((stage) => {
    const count = leads.filter((lead) => lead.status === stage.key).length;
    return {
      ...stage,
      count,
      percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0,
    };
  });

  // Calculate max count for width scaling
  const maxCount = Math.max(...stageCounts.map((s) => s.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stageCounts.map((stage, index) => {
            const width = (stage.count / maxCount) * 100;
            const isLast = index === stageCounts.length - 1;

            return (
              <div key={stage.key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900 w-24">
                      {stage.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {stage.count}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({stage.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-medium text-sm transition-all duration-300 shadow-sm"
                    style={{
                      width: `${Math.max(width, 15)}%`,
                    }}
                  >
                    {stage.count > 0 && (
                      <span className="px-2">{stage.count} leads</span>
                    )}
                  </div>
                </div>
                {!isLast && (
                  <div className="flex justify-center py-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-gray-400"
                    >
                      <path
                        d="M10 4L10 16M10 16L6 12M10 16L14 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
