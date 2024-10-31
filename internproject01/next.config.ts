import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    api_base_url: " http://localhost:5000/api",
  },
  images: {
    domains: ["w0.peakpx.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
