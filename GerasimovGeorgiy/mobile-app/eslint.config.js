// ESLint v9 flat config (CommonJS)
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginReactNative = require('eslint-plugin-react-native');
const pluginReactNativeA11y = require('eslint-plugin-react-native-a11y');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-native': pluginReactNative,
      'react-native-a11y': pluginReactNativeA11y,
      prettier: pluginPrettier,
    },
    rules: {
      // React
      'react/prop-types': 'off',
      'react/display-name': 'off',
      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // React Native
      'react-native/no-inline-styles': 'error',
      'react-native/no-color-literals': 'error',
      // Accessibility
      'react-native-a11y/has-accessibility-hint': 'warn',
      // Enforce styled-components
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['StyleSheet'],
              message: 'Use styled-components instead of StyleSheet.create',
            },
          ],
        },
      ],
      // Prettier
      'prettier/prettier': 'error',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
