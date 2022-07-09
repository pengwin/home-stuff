import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
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
  },
  resolve: {
    conditions: ['development', 'browser'],
  }
});
