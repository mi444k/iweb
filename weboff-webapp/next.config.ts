import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const strapiUrl = process.env.STRAPI_API_URL || "http://127.0.0.1:1337";
const strapi = new URL(strapiUrl);

const remotePatterns: RemotePattern[] = [
  {
    protocol: strapi.protocol.replace(":", "") as "http" | "https",
    hostname: strapi.hostname,
    pathname: "/**",
    ...(strapi.port ? { port: strapi.port } : {}),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
