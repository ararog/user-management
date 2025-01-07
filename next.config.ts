import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config, {}) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src', 'app');
    return config;
  }, 
};
export default nextConfig;
