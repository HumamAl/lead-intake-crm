"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
      outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
      md: "px-4 py-2 text-sm rounded-lg gap-2",
      lg: "px-6 py-3 text-base rounded-lg gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" size={size === "sm" ? 14 : 16} />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
