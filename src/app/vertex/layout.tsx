import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'VERTEX Real Estate Website Concept',
  'Explore the VERTEX real estate website concept. Compare apartments, floor plans and pricing in an interactive residential development experience.',
  "vertex",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
