import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-90d0c263b7824207bc680d259aa7fdcc.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
