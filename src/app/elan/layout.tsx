import type { ReactNode } from "react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata(
  'ÉLAN Beauty & Wellness Website Concept',
  'Explore the ÉLAN beauty and wellness studio concept with service selection and a demonstration appointment flow.',
  "elan",
);

export default function DemoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
