import type { NextConfig } from "next";

const pbUrl = process.env.NEXT_PUBLIC_PB_URL || process.env.PB_URL;
type RemotePattern = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>[number];
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "http",
    hostname: "localhost",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
  },
  {
    protocol: "http",
    hostname: "0.0.0.0",
  },
];

if (pbUrl) {
  try {
    const url = new URL(pbUrl);
    const pattern: RemotePattern = {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
    };
    remotePatterns.push(pattern);
  } catch {
    // ignore invalid URL
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
