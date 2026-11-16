import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'MOTION Automotive Service Website Concept',
  'Explore the MOTION automotive service website concept with a service catalogue, live price estimate and demo booking.',
  "motion",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
