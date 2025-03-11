import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
    include: ['lucide-react'],
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'lucide-react'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react'],
        },
      },
    },
  },
});
