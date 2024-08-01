import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // 프로덕션 모드에서만 소스 맵을 생성
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default withPWA(nextConfig);
