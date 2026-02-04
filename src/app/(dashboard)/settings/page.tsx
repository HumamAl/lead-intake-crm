"use client";

import { useEffect, useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { TeamManagement } from "@/components/settings/team-management";
import { EmailTemplates } from "@/components/settings/email-templates";
import { GeneralSettings } from "@/components/settings/general-settings";
import { initializeStorage, getTeam } from "@/lib/storage";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";

type SettingsTab = "general" | "team" | "templates";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const teamData = getTeam();
    setTeam(teamData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
          <div className="h-12 bg-gray-200 rounded w-full max-w-md"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const tabs: { id: SettingsTab; label: string }[] = [
    { id: "general", label: "General" },
    { id: "team", label: "Team" },
    { id: "templates", label: "Email Templates" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <SettingsIcon className="text-indigo-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">
          Manage your account and team preferences
        </p>
      </div>

      {/* Tabs */}
      <div>
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "team" && <TeamManagement team={team} />}
        {activeTab === "templates" && <EmailTemplates />}
      </div>
    </div>
  );
}
