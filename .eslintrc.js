module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:solid/typescript',
        'prettier',
        'plugin:tailwindcss/recommended',
        'plugin:css/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'solid', 'tailwindcss', 'css'],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
    ignorePatterns: ['**/index.css'],
};
