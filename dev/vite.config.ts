import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  assetsInclude:['**/*.json', "**/*.svg", "**/assets/config/*.json"],
  base: './',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
