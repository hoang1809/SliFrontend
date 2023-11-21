const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard',
  //       permanent: true,
  //     },
  //   ];
  // },
  // rules: {
  //   // Other rules
  //   '@next/next/no-img-element': 'off',
  // },
  images: {
    domains: [
      'i.seadn.io',
      's3.amazonaws.com',
      'www.coindesk.com',
      'gateway.pinata.cloud',
      'lh3.googleusercontent.com',
      'openseauserdata.com',
    ],
  },
};

module.exports = nextConfig;
