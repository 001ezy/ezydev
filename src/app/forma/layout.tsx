import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'FORMA Architecture & Construction Website Concept',
  'Explore the FORMA architecture website concept, project catalogue and construction estimate calculator.',
  "forma",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
