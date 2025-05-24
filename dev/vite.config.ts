import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  assetsInclude:['**/*.json', "**/*.svg"],
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,
  }
});
