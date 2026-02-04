"use client";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full px-3 py-2 border rounded-lg text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              error
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
