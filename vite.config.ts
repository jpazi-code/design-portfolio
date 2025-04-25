import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicitly configure asset handling
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
  // Improve build for production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})
