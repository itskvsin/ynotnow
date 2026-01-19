import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70,75,100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
