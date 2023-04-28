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
        'plugin:css/recommended',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'solid', 'css', 'i18next'],
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
    },
    ignorePatterns: ['**/index.css'],
};
