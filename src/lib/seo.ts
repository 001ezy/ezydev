import type { Metadata } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export const SITE_ORIGIN = isGitHubPages
  ? "https://001ezy.github.io"
  : "https://ezydev.mr-eshmambetov.workers.dev";
export const SITE_BASE_PATH = isGitHubPages ? "/ezydev" : "";
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}/`;

export function absoluteSiteUrl(pathname = "") {
  const normalizedPath = pathname.replace(/^\/+|\/+$/g, "");
  return normalizedPath ? `${SITE_URL}${normalizedPath}/` : SITE_URL;
}

export function absoluteAssetUrl(filename: string) {
  return `${SITE_URL}${filename.replace(/^\/+/, "")}`;
}

export function createPageMetadata(title: string, description: string, pathname = ""): Metadata {
  const canonical = absoluteSiteUrl(pathname);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "EZY DEV.",
      title: `${title} | EZY DEV.`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | EZY DEV.`,
      description,
    },
  };
}
