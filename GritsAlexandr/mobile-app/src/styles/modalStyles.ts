import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createModalStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: themeStyles.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeStyles.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeStyles.text,
    },
    modalContent: {
      padding: 20,
    },
    modalFooter: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: themeStyles.border,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: themeStyles.text,
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: themeStyles.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: themeStyles.text,
      backgroundColor: themeStyles.card,
      minHeight: 120,
      textAlignVertical: 'top',
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    switchLabel: {
      fontSize: 16,
      color: themeStyles.text,
    },
  });
};