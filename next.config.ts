import type { NextConfig } from "next";

// Ensure required environment variables are present
const requiredEnvs = ['GOOGLE_GEMINI_API_KEY'];
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    console.warn(`⚠️ Required environment variable ${env} is missing.`);
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Do not expose API keys to the browser
  // The API key should only be used in server-side API routes
  
  // Handling Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

export default nextConfig;
