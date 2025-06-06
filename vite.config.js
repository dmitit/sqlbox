import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import analyzer from 'vite-bundle-analyzer';

const root = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig({
   mode: 'development',
   plugins: [react(), tailwindcss(), analyzer({ analyzerMode: 'server' })],
   resolve: {
      alias: {
         '@': root,
      },
   },
});
