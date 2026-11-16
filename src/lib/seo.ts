import type { Metadata } from "next";

export const SITE_ORIGIN = "https://001ezy.github.io";
export const SITE_BASE_PATH = "/ezydev";
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
