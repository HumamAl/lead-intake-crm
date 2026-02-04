"use client";

import { useEffect, useState } from "react";
import { initializeStorage, getStats, getLeads, getActivities } from "@/lib/storage";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { LeadsByStatusChart } from "@/components/dashboard/leads-by-status-chart";
import { LeadsBySourceChart } from "@/components/dashboard/leads-by-source-chart";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ConversionFunnel } from "@/components/dashboard/conversion-funnel";
import type { DashboardStats, Lead, Activity } from "@/lib/types";

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 h-80" />
        <div className="bg-white rounded-lg border border-gray-200 h-80" />
      </div>
      <div className="bg-white rounded-lg border border-gray-200 h-96" />
    </div>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeadsToday: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    averageResponseTime: "0h",
    totalRevenuePipeline: 0,
  });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Initialize storage and load data
    initializeStorage();

    // Small delay to simulate loading and ensure storage is ready
    const timer = setTimeout(() => {
      const loadedStats = getStats();
      const loadedLeads = getLeads();
      const loadedActivities = getActivities();

      setStats(loadedStats);
      setLeads(loadedLeads);
      setActivities(loadedActivities);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, Humam. Here&apos;s your lead overview.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsByStatusChart leads={leads} />
        <LeadsBySourceChart leads={leads} />
      </div>

      {/* Recent Leads + Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentLeadsTable leads={leads} />
        </div>
        <ActivityFeed activities={activities} />
      </div>

      {/* Conversion Funnel */}
      <ConversionFunnel leads={leads} />
    </div>
  );
}
