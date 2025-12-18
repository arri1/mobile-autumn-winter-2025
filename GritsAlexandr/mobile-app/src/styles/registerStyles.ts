import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createRegisterStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeStyles.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
      paddingTop: 40,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: themeStyles.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: themeStyles.secondary,
      textAlign: 'center',
    },
    form: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: themeStyles.text,
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      borderWidth: 1,
      borderColor: themeStyles.border,
      color: themeStyles.text,
    },
    errorContainer: {
      backgroundColor: themeStyles.error + '20',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: themeStyles.error,
    },
    errorText: {
      color: themeStyles.error,
      fontSize: 14,
      textAlign: 'center',
    },
    registerButton: {
      backgroundColor: themeStyles.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    registerButtonText: {
      color: themeStyles.background,
      fontSize: 16,
      fontWeight: '600',
    },
    demoButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: themeStyles.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    demoButtonText: {
      color: themeStyles.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: themeStyles.secondary,
      marginRight: 8,
    },
    footerLink: {
      fontSize: 16,
      color: themeStyles.primary,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
  });
};