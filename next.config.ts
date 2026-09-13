import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 💡 Добавляем объект 'images' для конфигурации внешних доменов
  images: {
    // 💡 Используем remotePatterns для современного подхода в Next.js 13/14
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Хост Cloudinary
        // Если вы загружаете не только изображения, можете добавить pathname: '/имя_вашего_облака/**'
      },
    ],
    // 💡 Если вы используете более старую версию Next.js, используйте 'domains':
    // domains: ['res.cloudinary.com'],
  },
  
  /* config options here */
};

export default nextConfig;