import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((env) => ({
    plugins: [
        solidPlugin(),
        Icons({ compiler: 'solid' }),
        visualizer({
            filename: './.artifacts/bundle.html',
        }),
        tsconfigPaths(),
    ],
    build: {
        target: 'esnext',
        modulePreload: false,
        minify: 'esbuild', // terser
    },
    test: {
        environment: 'jsdom',
        transformMode: {
            web: [/\.[jt]sx?$/],
        },
        // solid needs to be inline to work around
        // a resolution issue in vitest:
        exclude: ['./e2e', './node_modules'],
        // if you have few tests, try commenting one
        // or both out to improve performance:
        // threads: false,
        // isolate: false,
        coverage: {
            reportsDirectory: './.artifacts/coverage',
            reporter: ['text', 'json', 'html', 'json-summary'],
            branches: 70,
            /*all: true,
      src: ['./src']*/
        },
        reporters: ['dot', 'junit'],
        outputFile: {
            junit: '.artifacts/vitest.xml',
        },
    },
    resolve: {
        conditions:
            env.mode === 'test' ? ['development', 'browser'] : ['browser'],
    },
}));
