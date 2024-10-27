import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgrPlugin(),
    tsconfigPaths(),
  ],
});
