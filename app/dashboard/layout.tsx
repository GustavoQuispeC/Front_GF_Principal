"use client";

import { SidebarComponent } from "@/components";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <SidebarComponent>{children}</SidebarComponent>;
}
