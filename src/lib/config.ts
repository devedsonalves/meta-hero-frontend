import { type VitePWAOptions } from 'vite-plugin-pwa'

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets: ['logo.png', 'background.png', 'robots.txt'],
  manifest: {
    name: 'Meta Hero',
    short_name: 'Meta Hero',
    description: 'Meta Hero',
    theme_color: '#ffffff',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: 'logo.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
  },
}
