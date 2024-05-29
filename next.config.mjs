/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:slug*',
          destination: '/page_slug',
        },
      ];
    },
  };
  
  export default nextConfig;
  