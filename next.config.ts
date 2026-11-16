import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  // GitHub Pages hosts this repository under /ezydev; Cloudflare serves it at /.
  ...(process.env.GITHUB_PAGES === "true" ? { basePath: "/ezydev" } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
