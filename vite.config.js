import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), {
    name: 'digital-card-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (/^\/card\/?(?:\?|$)/.test(req.url)) {
          req.url = req.url.replace(/^\/card\/?/, '/card/index.html');
        }
        next();
      });
    },
  }],
  build: {
    rollupOptions: {
      input: { main: 'index.html', card: 'card/index.html' },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
