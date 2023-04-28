const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const usePurgeCss = false;

const purgeCssSettings = {
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
    defaultExtractor: content => content.match(/[\w-/:[\]]+(?<!:)/g) || [],
    safelist: {
        standard: ['/navbar/', '/^flex/', '/where/'],
    },
};

module.exports = {
    plugins: [
        tailwind,
        autoprefixer,
        usePurgeCss ? purgecss(purgeCssSettings) : undefined,
        cssnano({
            preset: 'default',
        }),
    ],
};
