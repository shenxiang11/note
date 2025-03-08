import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from "vite-plugin-compression"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      compressionOptions: {
        level: 9
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    proxy: {
      "/graphql": {
        target: "https://note.sneakerhunt.shop",
        // target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/resource": {
        target: "https://note.sneakerhunt.shop",
        // target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
})
