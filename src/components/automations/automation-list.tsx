"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { AutomationCard } from "./automation-card";
import type { AutomationRule } from "@/lib/types";

interface AutomationListProps {
  automations: AutomationRule[];
  onToggle: (id: string, enabled: boolean) => void;
}

export function AutomationList({ automations, onToggle }: AutomationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "enabled" | "disabled">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter automations
  const filteredAutomations = useMemo(() => {
    return automations.filter((rule) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "enabled" && rule.enabled) ||
        (statusFilter === "disabled" && !rule.enabled);

      return matchesSearch && matchesStatus;
    });
  }, [automations, searchQuery, statusFilter]);

  // Calculate stats
  const activeCount = automations.filter((r) => r.enabled).length;
  const totalTriggers = automations.reduce((sum, r) => sum + r.triggerCount, 0);

  const handleCreateRule = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center gap-2 text-indigo-700 mb-1">
            <Zap size={18} />
            <span className="text-sm font-medium">Active Rules</span>
          </div>
          <div className="text-2xl font-bold text-indigo-900">{activeCount}</div>
          <div className="text-xs text-indigo-600 mt-1">
            of {automations.length} total rules
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <Zap size={18} />
            <span className="text-sm font-medium">Total Triggers</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{totalTriggers.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">all-time executions</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 text-purple-700 mb-1">
            <Zap size={18} />
            <span className="text-sm font-medium">Avg per Rule</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {automations.length > 0 ? Math.round(totalTriggers / automations.length) : 0}
          </div>
          <div className="text-xs text-purple-600 mt-1">trigger executions</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          <Input
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={16} />}
            className="w-full sm:w-72"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="w-full sm:w-40"
          >
            <option value="all">All Rules</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </Select>
        </div>

        <Button onClick={handleCreateRule}>
          <Plus size={16} />
          Create Rule
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAutomations.length} {filteredAutomations.length === 1 ? "rule" : "rules"}
      </div>

      {/* Automation Grid */}
      {filteredAutomations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAutomations.map((rule) => (
            <AutomationCard key={rule.id} rule={rule} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Zap size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No automations found</h3>
          <p className="text-sm text-gray-500 mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first automation rule"}
          </p>
          {searchQuery === "" && statusFilter === "all" && (
            <Button onClick={handleCreateRule}>
              <Plus size={16} />
              Create Your First Rule
            </Button>
          )}
        </div>
      )}

      {/* Create Rule Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Automation Rule"
        description="Configure a new automation rule to streamline your workflow"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Creating new automation rules is available in the full version. This demo includes {automations.length} pre-configured rules showing various trigger types and action combinations.
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Available Trigger Types:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Lead Created - When a new lead is submitted</li>
                <li>Status Changed - When lead status is updated</li>
                <li>Time Based - Scheduled or delayed actions</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Available Actions:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                <li>Send Email - Automated email notifications</li>
                <li>Add Tag - Categorize leads automatically</li>
                <li>Update Priority - Adjust lead importance</li>
                <li>Assign Lead - Route to team members</li>
                <li>Slack Notification - Team alerts</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
