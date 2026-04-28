import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dxwm/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  preview: {
    host: '0.0.0.0',
  },
  build: {
    minify: false,
    reportCompressedSize: false,
  },
})
