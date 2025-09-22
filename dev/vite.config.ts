import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  assetsInclude:['/assets/config/*.json', '/assets/icon/*.svg'],
  base: './',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,
    assetsDir: './src/assets'
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets")
    }
  }
});
