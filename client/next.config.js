/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-43-200-8-24.ap-northeast-2.compute.amazonaws.com",
      "static.toss.im",
    ],
  },
};

module.exports = nextConfig;
