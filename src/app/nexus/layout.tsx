import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'NEXUS Logistics Website Concept',
  'Explore the NEXUS logistics website concept with shipping estimates, route planning and sample parcel tracking.',
  "nexus",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
