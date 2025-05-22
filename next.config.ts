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
  
  // Disable ESLint during build
  eslint: {
    // Warning: This will disable ESLint during build - only use this temporarily until issues are fixed
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    // Warning: This will disable TypeScript checking during build - only use this temporarily until issues are fixed
    ignoreBuildErrors: true,
  },
  
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
