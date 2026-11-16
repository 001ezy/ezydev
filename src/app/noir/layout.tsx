import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'NOIR Restaurant & Dining Website Concept',
  'Explore the NOIR restaurant website concept with a seasonal menu, interactive demo basket and reservation experience.',
  "noir",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
