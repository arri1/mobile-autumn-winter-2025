import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createNavigationStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: themeStyles.background,
    },
    loadingCard: {
      backgroundColor: themeStyles.card,
      borderRadius: 20,
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
      width: '100%',
      maxWidth: 300,
    },
    loadingText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: '600',
      color: themeStyles.text,
    },
    loadingSubtext: {
      marginTop: 8,
      fontSize: 14,
      color: themeStyles.secondary,
      textAlign: 'center',
    },
    tabContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 8,
    },
    tabIconContainer: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
      borderWidth: 2,
    },
    tabIconText: {
      fontSize: 14,
      fontWeight: '700',
    },
    tabLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
  });
};

// Вспомогательные функции
export const getTabBarStyle = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  return {
    backgroundColor: themeStyles.card,
    borderTopColor: themeStyles.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 8,
  };
};