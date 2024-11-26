import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'

export default [
  ...vue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      ...prettier.rules,
    },
  },
]
