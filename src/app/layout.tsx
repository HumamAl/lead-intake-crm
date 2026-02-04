import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeadFlow CRM — Lead Intake & Automation System",
  description: "Custom lead intake and automation system with CRM dashboard, automated follow-ups, and team collaboration.",
  openGraph: {
    title: "LeadFlow CRM — Lead Intake & Automation System",
    description: "Custom lead intake and automation system with CRM dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
