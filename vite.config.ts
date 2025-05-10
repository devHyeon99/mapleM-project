import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    tailwindcss(),
    ViteImageOptimizer({
      webp: {
        lossless: true,
        quality: 80,
      },
      logStats: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React 핵심 라이브러리 분리
          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('react')
          ) {
            return 'vendor-react';
          }
          // Tanstack (React Query, React Table) 분리
          if (id.includes('@tanstack')) {
            return 'vendor-tanstack';
          }
          // Radix UI 라이브러리 전체 분리
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }
          // 폼 관련 라이브러리 분리 (react-hook-form, zod)
          if (id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor-forms';
          }
          // 아이콘 라이브러리 분리
          if (id.includes('lucide-react') || id.includes('react-icons')) {
            return 'vendor-icons';
          }
          // Supabase 클라이언트 분리
          if (id.includes('@supabase')) {
            return 'vendor-supabase';
          }
          // 그 외 모든 node_modules 라이브러리
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
