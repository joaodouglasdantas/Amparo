module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    'react-native/react-native': true
  }
};
