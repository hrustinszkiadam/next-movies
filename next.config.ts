import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactCompiler: true,
	cacheComponents: true,
	allowedDevOrigins: ['dev.hrustinszki.tech'],
};

export default nextConfig;
