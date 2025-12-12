import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const navigationStyles = StyleSheet.create({
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 4,
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700' as any, // Используем строку вместо числа
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600' as any, // Используем строку вместо числа
  },
});

// Функция для получения текста иконки по имени роута
export const getIconText = (routeName: string): string => {
  switch (routeName) {
    case 'UseState':
      return 'S';
    case 'UseEffect':
      return 'E';
    case 'UseMemo':
      return 'M';
    case 'Zustand':
      return 'Z';
    default:
      return '';
  }
};

// Функция для получения стилей иконки
export const getIconStyles = (
  focused: boolean,
  themeStyles: {
    primary: string;
    secondary: string;
  }
): {
  container: ViewStyle;
  text: TextStyle;
} => {
  return {
    container: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginBottom: 4,
      backgroundColor: focused ? themeStyles.primary : 'transparent',
    },
    text: {
      fontSize: 14,
      fontWeight: '700' as any,
      color: focused ? '#fff' : themeStyles.secondary,
    },
  };
};

// Функция для получения стилей таб-бара
export const getTabBarStyle = (themeStyles: {
  card: string;
  border: string;
}) => {
  return {
    backgroundColor: themeStyles.card,
    borderTopColor: themeStyles.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  };
};