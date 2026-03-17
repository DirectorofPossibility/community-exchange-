/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/activities',
        destination: '/available-resources',
        permanent: true,
      },
      {
        source: '/activities/:id',
        destination: '/available-resources/:id',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
