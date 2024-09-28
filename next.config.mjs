/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_CLI_BASE_URL,
    },
    images: {
        domains: ['images.unsplash.com'], // 이미지 도메인 추가
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    // 라우터 캐시 갱신 주기 재설정
    // 프레임워크 디폴트 값 dynamic : 30, static: 300
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 300,
        },
    },
};

export default nextConfig;