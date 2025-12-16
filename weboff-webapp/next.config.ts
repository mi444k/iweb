import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_API_URL || "http://127.0.0.1:1337";
const strapi = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", ""),
        hostname: strapi.hostname,
        port: strapi.port || undefined,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
