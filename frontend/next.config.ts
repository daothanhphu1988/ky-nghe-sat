import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "http", hostname: "localhost", port: "8080" },
    ],
  },
};

export default nextConfig;
