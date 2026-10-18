/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: "/tests/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.asi-solution.com" }],
        destination: "https://asi-solution.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
