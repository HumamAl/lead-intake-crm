"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Zap, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/leads", icon: Users, label: "Leads" },
  { href: "/automations", icon: Zap, label: "Automations" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-indigo-950 text-white z-50 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
              LF
            </div>
            <h1 className="text-xl font-bold">LeadFlow CRM</h1>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden text-indigo-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-200 hover:bg-indigo-900 hover:text-white"
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-900">
          <p className="text-xs text-indigo-400 text-center">
            &copy; 2026 LeadFlow CRM
          </p>
        </div>
      </aside>
    </>
  );
}
