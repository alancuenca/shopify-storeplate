import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

const siteUrl =
  process.env.PUBLIC_SITE_URL || 'https://your-site-name.netlify.app';
const site = new URL(siteUrl);

export default defineConfig({
  site: siteUrl, // Update after deployment
  output: 'server', // Astro 5: server mode for SSR, use prerender = true for static pages
  adapter: netlify(),
  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        hostname: site.hostname,
        protocol: site.protocol.replace(':', ''),
      },
    ],
  },
  // Prefetch links on hover for faster navigation
  prefetch: {
    prefetchAll: false, // Don't prefetch everything, only on hover
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [ tailwindcss() ],
    // Optimize dependency bundling
    optimizeDeps: {
      include: [ 'swiper', 'nanostores', '@nanostores/react', 'js-cookie' ],
    },
    ssr: {
      // Don't externalize these packages in SSR
      noExternal: [ 'swiper' ],
    },
    build: {
      // Improve chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': [ 'react', 'react-dom' ],
            'swiper-vendor': [ 'swiper' ],
          },
        },
      },
    },
  },
});