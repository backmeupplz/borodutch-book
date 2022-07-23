import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    preact(),
    tsconfigPaths(),
    !production &&
      (nodePolyfills({
        include: [
          'node_modules/**/*.js',
          new RegExp('node_modules/.vite/.*js'),
        ],
      }) as unknown as Plugin),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as unknown as Plugin,
        nodePolyfills() as unknown as Plugin,
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
