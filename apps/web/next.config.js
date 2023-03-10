const withTM = require('next-transpile-modules')(['@uhgenie7/ui']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
