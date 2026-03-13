import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix: Turbopack resolves CSS @import from workspace root (parent .git dir)
  // instead of this project dir. Force resolution to local node_modules.
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
    },
  },
  webpack: (config) => {
    // Ensure webpack also resolves from this project's node_modules first
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
    ];
    return config;
  },
};

export default nextConfig;
