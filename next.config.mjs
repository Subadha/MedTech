/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    domains: ['avatar.iran.liara.run','res.cloudinary.com','ui-avatars.com'],
  },
};

export default nextConfig;
