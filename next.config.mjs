import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  // 추가 설정이 있다면 여기에 작성
};

export default withPWA(nextConfig);
