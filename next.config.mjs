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
};

export default nextConfig;
