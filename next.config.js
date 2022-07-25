/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['stat.7gogo.jp']
  }
}

module.exports = nextConfig
