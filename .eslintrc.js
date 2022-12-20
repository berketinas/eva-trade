module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'quote-props': ['error', 'consistent-as-needed'],
        'indent': ['error', 4],
        'no-console': ['error', { allow: ['log'] }],
        'linebreak-style': ['error', 'windows'],
    },
};
