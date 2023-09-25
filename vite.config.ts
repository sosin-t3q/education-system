import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    // checker({
    //   typescript: true,
    // }),
    svgr(),
  ],
  server: {
    host: true,
    port: 3000,
    cors: true,
  },
})
