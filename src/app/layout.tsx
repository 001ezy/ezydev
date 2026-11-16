import type { Metadata } from "next";
import "./globals.css";
import { Experience } from "@/components/experience";

export const metadata: Metadata = {
  title: "EZY DEV. — Digital experiences. Engineered to perform.",
  description:
    "Independent digital studio building high-performing websites and digital products for ambitious businesses around the world.",
  openGraph: {
    title: "EZY DEV. — Digital experiences. Engineered to perform.",
    description: "Independent digital studio / Global",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<Experience /></body>
    </html>
  );
}
