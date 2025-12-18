// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['app/**', 'components/**'],
    rules: {
      // В шаблонных файлах Expo Router отключаем проверку нерешённых alias-импортов,
      // чтобы не получать ошибки вида import/no-unresolved для "@/..."
      'import/no-unresolved': 'off',
    },
  },
]);
