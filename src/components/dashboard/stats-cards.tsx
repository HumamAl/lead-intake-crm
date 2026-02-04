"use client";

import { Users, UserPlus, UserCheck, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/lib/types";

export interface StatsCardsProps {
  stats: DashboardStats;
}

const statConfigs = [
  {
    key: "totalLeads",
    label: "Total Leads",
    icon: Users,
    color: "indigo",
    change: "+12.5%",
    changePositive: true,
  },
  {
    key: "newLeadsToday",
    label: "New Today",
    icon: UserPlus,
    color: "blue",
    change: "+8.3%",
    changePositive: true,
  },
  {
    key: "qualifiedLeads",
    label: "Qualified",
    icon: UserCheck,
    color: "green",
    change: "+15.2%",
    changePositive: true,
  },
  {
    key: "conversionRate",
    label: "Conversion Rate",
    icon: TrendingUp,
    color: "emerald",
    change: "-3.2%",
    changePositive: false,
  },
  {
    key: "averageResponseTime",
    label: "Avg Response Time",
    icon: Clock,
    color: "yellow",
    change: "-12.5%",
    changePositive: true,
  },
  {
    key: "totalRevenuePipeline",
    label: "Revenue Pipeline",
    icon: DollarSign,
    color: "purple",
    change: "+23.4%",
    changePositive: true,
  },
];

const colorClasses: Record<string, { bg: string; text: string; icon: string }> = {
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", icon: "text-indigo-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", icon: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600", icon: "text-green-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", icon: "text-emerald-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", icon: "text-yellow-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", icon: "text-purple-600" },
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statConfigs.map((config) => {
        const Icon = config.icon;
        const colors = colorClasses[config.color];
        let value = stats[config.key as keyof DashboardStats];

        // Format value based on type
        if (config.key === "totalRevenuePipeline" && typeof value === "number") {
          value = formatCurrency(value);
        } else if (config.key === "conversionRate" && typeof value === "number") {
          value = `${value}%`;
        }

        return (
          <Card key={config.key}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {config.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className={cn(
                        "font-medium",
                        config.changePositive ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {config.change}
                    </span>
                    <span className="text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-lg", colors.bg)}>
                  <Icon className={colors.icon} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
