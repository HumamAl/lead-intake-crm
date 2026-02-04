"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { AutomationList } from "@/components/automations/automation-list";
import { initializeStorage, getAutomations, updateAutomation } from "@/lib/storage";
import type { AutomationRule } from "@/lib/types";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const data = getAutomations();
    setAutomations(data);
    setLoading(false);
  }, []);

  const handleToggle = (id: string, enabled: boolean) => {
    updateAutomation(id, { enabled });
    setAutomations(getAutomations());
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-96"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Zap className="text-indigo-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Automation Rules</h1>
        </div>
        <p className="text-gray-600">
          Configure automated workflows for lead management and streamline your sales process
        </p>
      </div>

      {/* Automation List */}
      <AutomationList automations={automations} onToggle={handleToggle} />
    </div>
  );
}
