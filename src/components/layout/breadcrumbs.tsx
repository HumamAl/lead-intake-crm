"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    // Handle special cases
    let label: string;

    // If it looks like a UUID or ID (contains dashes and numbers), show as "Detail"
    if (segment.match(/^[a-f0-9-]{20,}$/i) || (index > 0 && pathSegments[index - 1] === "leads")) {
      label = "Lead Detail";
    } else {
      // Otherwise, capitalize kebab-case
      label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return { href, label };
  });

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
      >
        <Home size={16} />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <Fragment key={crumb.href}>
            <ChevronRight size={16} className="text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
