module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript'
  ],

  ignorePatterns: [
    '**/node_modules',
  ], 

  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2
      }
    ],
    'vue/require-default-prop': 0,
    'array-bracket-spacing': 0,
    'vue/no-v-html': 0,
    'vue/no-template-shadow': 0
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
