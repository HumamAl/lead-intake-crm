"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "bg-white",
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
