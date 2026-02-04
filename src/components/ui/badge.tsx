import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { LeadStatus, LeadPriority } from "@/lib/types";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  status?: LeadStatus;
  priority?: LeadPriority;
}

export function Badge({ className, variant = "default", status, priority, children, ...props }: BadgeProps) {
  // Status-based styling
  const statusStyles: Record<LeadStatus, string> = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
    qualified: "bg-green-100 text-green-700 border-green-200",
    proposal: "bg-purple-100 text-purple-700 border-purple-200",
    won: "bg-emerald-100 text-emerald-700 border-emerald-200",
    lost: "bg-red-100 text-red-700 border-red-200",
  };

  // Priority-based styling
  const priorityStyles: Record<LeadPriority, string> = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-gray-100 text-gray-700 border-gray-200",
  };

  // Variant-based styling
  const variantStyles = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
  };

  const getStyles = () => {
    if (status) return statusStyles[status];
    if (priority) return priorityStyles[priority];
    return variantStyles[variant];
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStyles(),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
