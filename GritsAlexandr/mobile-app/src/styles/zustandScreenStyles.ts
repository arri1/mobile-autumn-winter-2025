import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createZustandStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeStyles.background,
    },
    content: {
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
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
    },
    card: {
      backgroundColor: themeStyles.card,
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      shadowColor: themeStyles.shadowColor,
      shadowOpacity: themeStyles.shadowOpacity,
      shadowRadius: themeStyles.shadowRadius,
      shadowOffset: themeStyles.shadowOffset,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    cardIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeStyles.text,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: themeStyles.border + '40',
    },
    infoLabel: {
      color: themeStyles.secondary,
      fontSize: 16,
      flex: 1,
    },
    infoValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
    },
    infoValue: {
      color: themeStyles.text,
      fontSize: 16,
      fontWeight: '500',
    },
    statusIcon: {
      fontSize: 14,
      marginLeft: 4,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    loadingText: {
      color: themeStyles.secondary,
      marginLeft: 12,
      fontSize: 16,
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeStyles.error + '20',
      padding: 16,
      borderRadius: 12,
      marginTop: 16,
      borderWidth: 1,
      borderColor: themeStyles.error,
    },
    errorIcon: {
      fontSize: 16,
      color: themeStyles.error,
      marginRight: 8,
    },
    errorText: {
      color: themeStyles.error,
      fontSize: 14,
      flex: 1,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeStyles.error,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    infoBox: {
      backgroundColor: themeStyles.background + '40',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    infoText: {
      color: themeStyles.secondary,
      fontSize: 15,
      lineHeight: 22,
    },
  });
};