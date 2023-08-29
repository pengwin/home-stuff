import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { faviconPlugin } from './build/favicon-plugin';

export default defineConfig(env => ({
    plugins: [
        solidPlugin(),
        Icons({ compiler: 'solid' }),
        visualizer({
            filename: './.artifacts/bundle.html',
        }),
        tsconfigPaths(),
        faviconPlugin(
            {
                icon: './src/favicon.png',
                favicon: {
                    path: '/assets',
                    lang: 'en-US',
                    developerName: '',
                    developerURL: '',

                    appName: 'Home Stuff',
                    appShortName: 'HomeStuff',
                    appDescription: 'Application to manage home stuff',
                    start_url: '/',

                    manifestMaskable: true,

                    icons: {
                        android: true,
                        favicons: true,
                        appleIcon: true,
                        appleStartup: false,
                        yandex: false,
                        windows: false,
                    },
                },
            },
            env,
        ),
    ],
    build: {
        target: 'esnext',
        modulePreload: false,
        minify: 'esbuild', // terser
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]';
                    }

                    if (/\.ico$/.test(name ?? '')) {
                        return 'assets/icons/[name]-[hash][extname]';
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]';
                    }

                    // default value
                    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
    worker: {
        rollupOptions: {
            output: {
                entryFileNames: opts => {
                    if (opts.name === 'sw') {
                        return '[name]-[hash].js';
                    }

                    return 'assets/js/worker/[name]-[hash]';
                },
                chunkFileNames: 'assets/js/worker/[name]-[hash]',
                assetFileNames: 'assets/worker/[name]-[hash][extname]',
            },
        },
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
            enabled: true,
            extension: '.ts',
            clean: true,
            provider: 'v8',
            reportsDirectory: './.artifacts/coverage',
            reporter: ['text', 'json', 'html', 'json-summary'],
            branches: 70,
        },
        deps: {
            inline: [/solid-js/, /@solidjs\/router/],
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
