import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

try {
  const duplicatePath = path.join(process.cwd(), "src/app/api/auth/admin/users/[userId]");
  if (fs.existsSync(duplicatePath)) {
    fs.rmSync(duplicatePath, { recursive: true, force: true });
    console.log("Cleaned up conflicting API route: [userId]");
  }
} catch {
  // Ignore
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'unavatar.io',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Tree-shake icon libraries and framer-motion — prevents shipping all
    // 7000+ lucide icons or all react-icons variants in the bundle.
    optimizePackageImports: [
      'react-icons',
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-slot',
    ],
  },
};

export default nextConfig;
