module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
      },
    ],
    'vue/require-default-prop': false
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}