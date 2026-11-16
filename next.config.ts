import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  basePath: "/ezydev",
  images: { unoptimized: true },
};

export default nextConfig;
