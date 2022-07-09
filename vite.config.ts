import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(env => ({
  plugins: [
    solidPlugin(),
    visualizer({
      filename: './.artifacts/bundle.html'
    })
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    polyfillModulePreload: false,
    minify: 'esbuild' // terser
  },
  test: {
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/, /solid-testing-library/],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    // threads: false,
    // isolate: false,
    coverage: {
      clean: true,
      reportsDirectory: './.artifacts/coverage',
      reporter: ['text', 'json', 'html'],
    },
    reporters: [
      'dot', 'junit'
    ],
    outputFile: {
      'junit' : '.artifacts/vitest.xml'
    }
  },
  resolve: {
    conditions: env.mode == 'test' ? ['development', 'browser'] : ['browser'],
  }
}));
