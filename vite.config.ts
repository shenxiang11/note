import path from "node:path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
