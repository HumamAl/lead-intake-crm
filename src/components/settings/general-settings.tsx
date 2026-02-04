"use client";

import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface GeneralSettingsState {
  companyName: string;
  emailNotifications: boolean;
  slackNotifications: boolean;
  desktopNotifications: boolean;
  leadScoringEnabled: boolean;
  defaultAssignment: "round_robin" | "manual" | "load_balanced";
  autoArchiveDays: number;
}

const defaultSettings: GeneralSettingsState = {
  companyName: "LeadFlow CRM",
  emailNotifications: true,
  slackNotifications: true,
  desktopNotifications: false,
  leadScoringEnabled: true,
  defaultAssignment: "round_robin",
  autoArchiveDays: 90
};

export function GeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm_general_settings');
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_general_settings', JSON.stringify(settings));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="text-indigo-600" size={20} />
          <CardTitle>General Settings</CardTitle>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Configure your account preferences and defaults
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Company Information</h3>
            <Input
              label="Company Name"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              placeholder="Your company name"
            />
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                  <div className="text-xs text-gray-500">Receive updates via email</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.slackNotifications}
                  onChange={(e) => setSettings({ ...settings, slackNotifications: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Slack Notifications</div>
                  <div className="text-xs text-gray-500">Post updates to Slack channels</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.desktopNotifications}
                  onChange={(e) => setSettings({ ...settings, desktopNotifications: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Desktop Notifications</div>
                  <div className="text-xs text-gray-500">Show browser notifications</div>
                </div>
              </label>
            </div>
          </div>

          {/* Lead Management */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Lead Management</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.leadScoringEnabled}
                  onChange={(e) => setSettings({ ...settings, leadScoringEnabled: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Lead Scoring</div>
                  <div className="text-xs text-gray-500">Automatically calculate lead scores based on engagement</div>
                </div>
              </label>

              <Select
                label="Default Lead Assignment"
                value={settings.defaultAssignment}
                onChange={(e) => setSettings({ ...settings, defaultAssignment: e.target.value as GeneralSettingsState['defaultAssignment'] })}
              >
                <option value="round_robin">Round Robin</option>
                <option value="manual">Manual Assignment</option>
                <option value="load_balanced">Load Balanced</option>
              </Select>

              <Input
                label="Auto-archive lost leads after"
                type="number"
                value={settings.autoArchiveDays}
                onChange={(e) => setSettings({ ...settings, autoArchiveDays: parseInt(e.target.value) || 0 })}
                min="0"
                placeholder="90"
              />
              <p className="text-xs text-gray-500 -mt-2">
                Leads marked as lost will be automatically archived after this many days
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <Button onClick={handleSave}>
              <Save size={16} />
              Save Settings
            </Button>
            {saved && (
              <span className="text-sm text-green-600 font-medium">
                Settings saved successfully!
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
