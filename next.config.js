/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja']
  },
}

module.exports = nextConfig
