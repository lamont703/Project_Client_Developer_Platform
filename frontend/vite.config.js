import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Create a single HTML file with everything inlined
    rollupOptions: {
      output: {
        // Inline all assets
        inlineDynamicImports: true,
        // Create a single bundle
        manualChunks: undefined,
        // Inline CSS
        assetFileNames: 'assets/[name].[ext]',
      }
    },
    // Inline all assets
    assetsInlineLimit: Infinity,
    // Create a single HTML file
    outDir: 'dist-ghl',
  },
  // Optimize for single file output
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
}) 