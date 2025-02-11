import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
export default defineConfig({
  plugins: [react() , nodePolyfills()],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    rollupOptions: {
      external: ['url', 'cloudinary'], 
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), 
    },
  },
});