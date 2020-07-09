module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/semi': [
      'error', 'never'
    ],
    'class-methods-use-this': 0,
  }
}