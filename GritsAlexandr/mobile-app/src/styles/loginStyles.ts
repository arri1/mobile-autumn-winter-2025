import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createLoginStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeStyles.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 24,
    },
    card: {
      backgroundColor: themeStyles.card,
      borderRadius: 20,
      padding: 32,
      shadowColor: themeStyles.shadowColor,
      shadowOpacity: themeStyles.shadowOpacity,
      shadowRadius: themeStyles.shadowRadius,
      shadowOffset: themeStyles.shadowOffset,
      elevation: 3,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: themeStyles.text,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: themeStyles.secondary,
      textAlign: 'center',
      marginBottom: 32,
    },
    input: {
      backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: themeStyles.border,
      color: themeStyles.text,
      marginBottom: 16,
    },
    button: {
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      backgroundColor: theme === 'dark' ? '#2563eb' : '#2563eb'
    },
    buttonText: {
      color: theme === 'dark' ? '#f9fafb' : '#f9fafb',
      fontSize: 16,
      fontWeight: '600',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    registerText: {
      fontSize: 14,
      color: themeStyles.secondary,
    },
    registerLink: {
      fontSize: 14,
      color: themeStyles.primary,
      fontWeight: '600',
    },
    footer: {
      marginTop: 40,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      color: themeStyles.secondary,
      textAlign: 'center',
    },
    footerSubtext: {
      fontSize: 12,
      color: themeStyles.secondary,
      marginTop: 4,
    },
  });
};