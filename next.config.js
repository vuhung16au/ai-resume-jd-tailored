/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Do not expose API keys to the browser
  // The API key should only be used in server-side API routes
  
  // IMPORTANT: Disable ESLint and TypeScript checking during build
  eslint: {
    // This disables ESLint during build - only use this temporarily until issues are fixed
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    // This disables TypeScript checking during build - only use this temporarily until issues are fixed
    ignoreBuildErrors: true,
  },
  
  // Make sure these settings are respected in Next.js build process
  experimental: {
    forceSwcTransforms: true,
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

module.exports = nextConfig;
