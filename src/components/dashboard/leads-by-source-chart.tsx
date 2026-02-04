"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip, PieLabelRenderProps } from "recharts";
import type { Lead } from "@/lib/types";

export interface LeadsBySourceChartProps {
  leads: Lead[];
}

const sourceColors: Record<string, string> = {
  website: "#3B82F6",
  referral: "#10B981",
  linkedin: "#0A66C2",
  cold_outreach: "#8B5CF6",
  partner: "#F59E0B",
  event: "#EC4899",
  other: "#6B7280",
};

const sourceLabels: Record<string, string> = {
  website: "Website",
  referral: "Referral",
  linkedin: "LinkedIn",
  cold_outreach: "Cold Outreach",
  partner: "Partner",
  event: "Event",
  other: "Other",
};

export function LeadsBySourceChart({ leads }: LeadsBySourceChartProps) {
  // Count leads by source
  const sourceCounts = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Transform to chart data with percentages
  const total = leads.length;
  const chartData = Object.entries(sourceCounts)
    .map(([source, count]) => ({
      name: sourceLabels[source] || source,
      value: count,
      percentage: ((count / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = Object.values(sourceColors);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: PieLabelRenderProps) => {
                const entry = chartData[props.index || 0];
                return `${entry?.percentage || 0}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number | undefined, name: string | undefined, props: any) => [
                `${value || 0} leads (${props.payload?.percentage || 0}%)`,
                name || '',
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
