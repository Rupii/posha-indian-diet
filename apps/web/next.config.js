/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@posha/ui', '@posha/nutrition-engine', '@posha/recipe-search'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
