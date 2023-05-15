import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
  },
})
