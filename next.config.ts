import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
        port: "",
        pathname: "/static/maplestorym/**",
      },
    ],
  },
};

export default nextConfig;
