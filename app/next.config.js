// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('./package.json');

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Expose the app version to the client (shown in the UI / announcements /
  // update modal). Kept in sync with package.json so the demo reports v2.5.0.
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },

  // Skip server-side parsing of heavy 3D libraries (faster builds / dev start).
  serverExternalPackages: [
    'three',
    '@pixiv/three-vrm',
    '@pixiv/three-vrm-animation',
  ],

  // Hide the Next.js dev indicator overlay.
  devIndicators: false,

  // Demo deployment (Cloudflare Pages) is a fully static export.
  ...(isDemoMode && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),

  // Non-demo usage of this workspace proxies API requests to the backend
  // (eliminates CORS). Rewrites are unsupported under static export, so they
  // are only enabled when not building the demo.
  ...(!isDemoMode && {
    async rewrites() {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
      const apiUrlNormalized = rawApiUrl.replace(/\/+$/, '').replace(/\/api$/, '');
      return [
        {
          source: '/api/:path*',
          destination: `${apiUrlNormalized}/api/:path*`,
        },
      ];
    },
  }),
};

module.exports = nextConfig;
