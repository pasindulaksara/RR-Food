/** @type {import('next').NextConfig} */
const nextConfig = { 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apirrfood.3dhdesign.info",
        pathname: "/**", // ✅ Add this to allow all image paths
      },
    ],
  },
};

module.exports = nextConfig;
