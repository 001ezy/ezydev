import type { Metadata } from "next";
import "./globals.css";
import { Experience } from "@/components/experience";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Digital experiences. Engineered to perform.",
    template: "%s | EZY DEV.",
  },
  description: "Independent digital studio building distinctive websites and digital products for ambitious businesses around the world.",
  applicationName: "EZY DEV.",
  openGraph: {
    title: "EZY DEV. — Digital experiences. Engineered to perform.",
    description: "Independent digital studio building websites and digital products for ambitious businesses.",
    type: "website",
    siteName: "EZY DEV.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "EZY DEV. — Digital experiences. Engineered to perform.",
    description: "Independent digital studio / Global",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<Experience /></body>
    </html>
  );
}
