/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    // add more generic rulesets here, such as:
    'plugin:import/errors',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  rules: {
    'strict': 'error',
    'vue/multi-word-component-names': 0,
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'comma-dangle': ['error', 'never'],
    'import/no-duplicates': 'error',
    "import/no-unresolved": 0,
    semi: ['error', 'never'],
    indent: [
      'error',
      2,
      {
        MemberExpression: 'off',
        SwitchCase: 1
      }
    ],
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error'
  }
}
