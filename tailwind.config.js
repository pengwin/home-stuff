import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        styled: true,
        themes: ['light'],
        base: true,
        utils: true,
        logs: false,
        rtl: false,
        prefix: '',
        darkTheme: 'dark',
    },
};
