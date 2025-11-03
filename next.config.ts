import { env } from '@/env';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: [env.DEV_HOST],
};

export default nextConfig;
