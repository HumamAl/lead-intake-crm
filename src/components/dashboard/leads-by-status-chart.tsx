"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Lead } from "@/lib/types";

export interface LeadsByStatusChartProps {
  leads: Lead[];
}

const statusColors: Record<string, string> = {
  new: "#3B82F6",
  contacted: "#EAB308",
  qualified: "#22C55E",
  proposal: "#A855F7",
  won: "#10B981",
  lost: "#EF4444",
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export function LeadsByStatusChart({ leads }: LeadsByStatusChartProps) {
  // Count leads by status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Transform to chart data
  const chartData = Object.entries(statusLabels).map(([status, label]) => ({
    status: label,
    count: statusCounts[status] || 0,
    fill: statusColors[status],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="status"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={{ stroke: "#D1D5DB" }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickLine={{ stroke: "#D1D5DB" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
