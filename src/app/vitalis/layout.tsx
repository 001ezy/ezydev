import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'VITALIS Healthcare Website Concept',
  'Explore the VITALIS healthcare website concept, browse specialists and try a demonstration visit request.',
  "vitalis",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
