import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
