import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { visualizer } from 'rollup-plugin-visualizer';
import UnocssPlugin from '@unocss/vite';
import presetWind from '@unocss/preset-wind';
import presetIcons from '@unocss/preset-icons';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig((env) => ({
    plugins: [
        istanbul({
            include: 'src/*',
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts', '.vue'],
            cypress: false,
            requireEnv: false,
            checkProd: false,
            forceBuildInstrument: true,
        }),
        solidPlugin(),
        UnocssPlugin({
            presets: [
                presetWind(),
                presetIcons({
                    /*collections: {
            mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
          }*/
                }),
            ],
        }),
        visualizer({
            filename: './.artifacts/bundle.html',
        }),
    ],
    build: {
        target: 'esnext',
        polyfillDynamicImport: false,
        polyfillModulePreload: false,
        minify: 'esbuild', // terser
    },
    test: {
        environment: 'jsdom',
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
            env.mode == 'test' ? ['development', 'browser'] : ['browser'],
    },
}));
