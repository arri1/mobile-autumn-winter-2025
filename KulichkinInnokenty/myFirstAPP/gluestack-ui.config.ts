import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-style/react';

// Черно-белая минималистичная тема с акцентом на иерархию и читаемость
export const config = createConfig({
  ...defaultConfig,
  tokens: {
    colors: {
      // Основная черно-белая палитра
      black: '#000000',
      white: '#FFFFFF',

      // Градации серого для иерархии
      gray50: '#FAFAFA',
      gray100: '#F5F5F5',
      gray200: '#E5E5E5',
      gray300: '#D4D4D4',
      gray400: '#A3A3A3',
      gray500: '#737373',
      gray600: '#525252',
      gray700: '#404040',
      gray800: '#262626',
      gray900: '#171717',

      // Семантические цвета (монохромные)
      primary: '#000000',
      secondary: '#404040',
      success: '#171717',
      error: '#000000',
      warning: '#262626',
      info: '#525252',

      // Фоновые цвета
      background: '#FFFFFF',
      backgroundAlt: '#FAFAFA',
      surface: '#FFFFFF',
      surfaceAlt: '#F5F5F5',

      // Текстовые цвета (иерархия)
      textPrimary: '#000000',
      textSecondary: '#525252',
      textTertiary: '#A3A3A3',
      textDisabled: '#D4D4D4',

      // Границы
      border: '#E5E5E5',
      borderStrong: '#D4D4D4',
      borderSubtle: '#F5F5F5',
    },
    space: {
      '0': 0,
      'px': 1,
      '0.5': 2,
      '1': 4,
      '1.5': 6,
      '2': 8,
      '2.5': 10,
      '3': 12,
      '3.5': 14,
      '4': 16,
      '5': 20,
      '6': 24,
      '7': 28,
      '8': 32,
      '9': 36,
      '10': 40,
      '12': 48,
      '16': 64,
      '20': 80,
      '24': 96,
      '32': 128,
    },
    fontSizes: {
      'xs': 12,
      'sm': 14,
      'md': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    lineHeights: {
      'xs': 16,
      'sm': 20,
      'md': 24,
      'lg': 28,
      'xl': 32,
      '2xl': 36,
      '3xl': 40,
      '4xl': 48,
      '5xl': 64,
      '6xl': 72,
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacings: {
      tighter: -0.8,
      tight: -0.4,
      normal: 0,
      wide: 0.4,
      wider: 0.8,
      widest: 1.6,
    },
    borderWidths: {
      '0': 0,
      '1': 1,
      '2': 2,
      '4': 4,
      '8': 8,
    },
    radii: {
      'none': 0,
      'xs': 2,
      'sm': 4,
      'md': 6,
      'lg': 8,
      'xl': 12,
      '2xl': 16,
      '3xl': 24,
      'full': 9999,
    },
  },
});

export type Config = typeof config;

declare module '@gluestack-ui/themed' {
  interface ICustomConfig extends Config {}
}
