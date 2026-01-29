/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gomowebb.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gomowebb.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/frontpage",
        destination: "/",
        permanent: true,  // Permanent redirect (HTTP 301)
      },
    ];
  },

  async rewrites() {
    return [
      // Danish language (specific paths first)
      {
        source: "/da",
        destination: "/da",
      },
      {
        source: "/da/:path*",
        destination: "/da/:path*",
      },
      // English (default language) - catch-all for everything else
      {
        source: "/",
        destination: "/en",
      },
      {
        source: "/:path*",
        destination: "/en/:path*",
      },
    ];
  },
};

export default nextConfig;
