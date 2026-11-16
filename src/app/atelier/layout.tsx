import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'ATELIER Furniture Shop Website Concept',
  'Explore the ATELIER furniture shop concept with a product catalogue, favorites and interactive demo basket.',
  "atelier",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
