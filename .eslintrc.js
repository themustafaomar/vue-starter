/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'semi': ['error', 'never'],
    'indent': [
      'error',
      2,
      {
        MemberExpression: 'off',
        SwitchCase: 1,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
