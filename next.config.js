/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/noso-gongmoju",
  assetPrefix: "/noso-gongmoju/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
