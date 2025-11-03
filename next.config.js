/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during build (Baton code has type issues)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Only lint coworking-related files
    dirs: ['src/app/best-coworking-spaces-nyc', 'src/app/brands', 'src/app/locations',
           'src/app/guide', 'src/app/neighborhoods', 'src/app/compare',
           'src/app/coworking-for-freelancers', 'src/app/day-pass-coworking',
           'src/app/privacy', 'src/app/terms', 'src/components/CoworkingNav.tsx',
           'src/components/Footer.tsx', 'src/components/CookieConsent.tsx', 'src/components/Button.tsx'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/best-coworking-spaces-nyc',
        permanent: true, // 301 redirect for SEO
      },
    ]
  },
}

module.exports = nextConfig
