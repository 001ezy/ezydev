import type { MetadataRoute } from "next";
import { absoluteAssetUrl, SITE_BASE_PATH } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: SITE_BASE_PATH ? `${SITE_BASE_PATH}/` : "/",
    },
    sitemap: absoluteAssetUrl("sitemap.xml"),
  };
}
