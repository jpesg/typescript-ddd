module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-console': 1,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'eol-last': 0,
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        'checksConditionals': false,
        'checksVoidReturn': false
      }
    ],
    '@typescript-eslint/no-extraneous-class': 'off'
  },
}
