import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// GitHub Pages project sites serve under /<repo>. The deploy workflow sets
// PAGES_BASE_PATH (e.g. "/beehive-cbs-hub"); locally it is empty (served at root).
const basePath = process.env.PAGES_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default withNextIntl(nextConfig);
