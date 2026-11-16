import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'ALTERRA Mountain Hotel Website Concept',
  'Explore the ALTERRA mountain retreat website concept with room availability, stay filters and booking estimate.',
  "alterra",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
