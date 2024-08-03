/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
    images: {
        domains: ['images.unsplash.com'], // 이미지 도메인 추가
    },
};

export default nextConfig;