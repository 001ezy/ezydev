import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'ORBIT Online Learning Platform Concept',
  'Explore ORBIT, an online learning platform concept with courses, interactive lessons, knowledge checks and progress tracking.',
  "orbit",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
