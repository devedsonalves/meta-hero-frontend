/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PWAConfig } from './src/lib/config';

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [react(), tsconfigPaths(), tailwindcss(), VitePWA(PWAConfig)],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
