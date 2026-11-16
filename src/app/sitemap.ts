import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicPaths = [
  "",
  "about",
  "work",
  "services",
  "process",
  "contact",
  "privacy",
  "work/vertex",
  "work/noir",
  "work/orbit",
  "work/motion",
  "work/forma",
  "work/vitalis",
  "work/atelier",
  "work/alterra",
  "work/elan",
  "work/nexus",
  "vertex",
  "noir",
  "orbit",
  "motion",
  "forma",
  "vitalis",
  "atelier",
  "alterra",
  "elan",
  "nexus",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicPaths.map((path, index) => ({
    url: absoluteSiteUrl(path),
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : index < 7 ? 0.8 : 0.6,
  }));
}
