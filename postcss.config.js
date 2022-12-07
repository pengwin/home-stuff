const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
const tailwind = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        tailwind,
        autoprefixer,
        cssnano({
            preset: 'default',
        }),
        //purgecss({
        //    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
        //}),
    ],
};
