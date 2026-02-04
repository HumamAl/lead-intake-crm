"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface LeadFiltersProps {
  filters: {
    search: string;
    status: string;
    priority: string;
    source: string;
    sort: string;
  };
  onFilterChange: (filters: LeadFiltersProps['filters']) => void;
}

export function LeadFilters({ filters, onFilterChange }: LeadFiltersProps) {
  const handleChange = (key: keyof LeadFiltersProps['filters'], value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      priority: 'all',
      source: 'all',
      sort: 'newest'
    });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.source !== 'all' ||
    filters.sort !== 'newest';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <Input
            placeholder="Search by name, email, or company..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            icon={<Search size={16} />}
          />
        </div>

        <div className="w-[160px]">
          <Select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Select>
        </div>

        <div className="w-[140px]">
          <Select
            value={filters.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </div>

        <div className="w-[160px]">
          <Select
            value={filters.source}
            onChange={(e) => handleChange('source', e.target.value)}
          >
            <option value="all">All Sources</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="linkedin">LinkedIn</option>
            <option value="cold_outreach">Cold Outreach</option>
            <option value="partner">Partner</option>
            <option value="event">Event</option>
            <option value="other">Other</option>
          </Select>
        </div>

        <div className="w-[160px]">
          <Select
            value={filters.sort}
            onChange={(e) => handleChange('sort', e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="score-high">Highest Score</option>
            <option value="score-low">Lowest Score</option>
            <option value="name-asc">Name A-Z</option>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters} size="md">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
