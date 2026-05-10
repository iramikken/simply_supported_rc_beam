import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all local IP addresses
    port: 5173,
    watch: {
      usePolling: true, // Essential for WSL/Docker file change detection
    },
    hmr: {
      clientPort: 5173, // Forces the browser to connect to the correct port
    },
  },
})
