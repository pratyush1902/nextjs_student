/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  images: {
    domains: ['localhost:1337'], // Replace with your Strapi API domain
  },
};

export default nextConfig;
