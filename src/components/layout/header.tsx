"use client";

import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumbs } from "./breadcrumbs";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Mobile menu + Breadcrumbs */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
          <Breadcrumbs />
        </div>

        {/* Center: Search bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search leads, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                "placeholder:text-gray-400"
              )}
            />
          </div>
        </div>

        {/* Right: Notifications + User */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar name="Humam" size="sm" />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Humam</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
