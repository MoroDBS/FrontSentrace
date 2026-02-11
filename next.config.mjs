import path from 'path';
import { fileURLToPath } from 'url';
import withPWA from 'next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Config turbopack vide pour désactiver l'avertissement mixte webpack+turbopack
  turbopack: {},

  webpack: (config, { isServer }) => {
    // Support pour importer SVG comme URL (sans ?react)
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/react/] },
      use: ['file-loader'],
    });

    // Support pour importer SVG comme React components (avec ?react)
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /react/,
      use: ['@svgr/webpack'],
    });

    // Support pour les fichiers audio MP3
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: `${isServer ? '../' : ''}static/audio/`,
          name: '[name].[ext]',
        },
      },
    });

    // Support pour les fichiers images
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images/',
          outputPath: `${isServer ? '../' : ''}static/images/`,
          name: '[name].[ext]',
        },
      },
    });

    // Support pour emotion RTL caching
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@emotion/cache': path.resolve(__dirname, './src/common/theme/emotionCache.js'),
      };
    }

    return config;
  },

  // Proxy API en développement (HTTP uniquement)
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082';
    
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${apiUrl}/api/:path*`,
        },
      ],
    };
  },

  // Headers pour éviter cache sur HTML
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // Typescript support
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default withPWA({
  dest: 'public',
  register: '/sw',
  skipWaiting: false,
  runtimeCaching: [
    {
      urlPattern: /^https:.*\.(?:png|jpg|jpeg|svg|gif|webp|ico|mp3|mp4|wav)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 200,
        },
      },
    },
    {
      urlPattern: /^https:.*\.js$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'js-cache',
      },
    },
    {
      urlPattern: /^https:.*\.css$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'css-cache',
      },
    },
    {
      urlPattern: /^https:.*\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 300,
        },
      },
    },
  ],
})(nextConfig);
