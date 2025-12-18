import { StyleSheet } from 'react-native';
import { darkThemeStyles, lightThemeStyles } from './appStyles';

export const createPostsStyles = (theme: 'light' | 'dark') => {
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeStyles.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: themeStyles.card,
      borderBottomWidth: 1,
      borderBottomColor: themeStyles.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: themeStyles.text,
    },
    headerSubtitle: {
      fontSize: 14,
      color: themeStyles.secondary,
      marginTop: 4,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: themeStyles.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    fabText: {
      fontSize: 24,
      color: '#fff',
      fontWeight: '600',
    },
    listContainer: {
      padding: 16,
    },
    postCard: {
      backgroundColor: themeStyles.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: themeStyles.border,
      shadowColor: themeStyles.shadowColor,
      shadowOffset: themeStyles.shadowOffset,
      shadowOpacity: themeStyles.shadowOpacity,
      shadowRadius: themeStyles.shadowRadius,
      elevation: 2,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    postTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: themeStyles.text,
      flex: 1,
      marginRight: 12,
    },
    postStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
    },
    statusPublished: {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
    },
    statusDraft: {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: 'rgba(107, 114, 128, 0.3)',
    },
    statusText: {
      fontSize: 12,
      fontWeight: '500',
    },
    postContent: {
      fontSize: 14,
      color: themeStyles.text,
      opacity: 0.8,
      marginBottom: 12,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: themeStyles.border,
    },
    authorInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    authorAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: themeStyles.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    authorInitial: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    authorName: {
      fontSize: 14,
      color: themeStyles.secondary,
    },
    postDate: {
      fontSize: 12,
      color: themeStyles.secondary,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 12,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
    },
    editButton: {
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      borderColor: 'rgba(37, 99, 235, 0.3)',
    },
    deleteButton: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    actionText: {
      fontSize: 14,
      fontWeight: '500',
    },
    editText: {
      color: themeStyles.primary,
    },
    deleteText: {
      color: '#ef4444',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      color: themeStyles.secondary,
      textAlign: 'center',
      marginTop: 16,
    },
    emptySubtext: {
      fontSize: 14,
      color: themeStyles.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 8,
    },
    pageButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: themeStyles.border,
      backgroundColor: themeStyles.card,
    },
    pageButtonDisabled: {
      opacity: 0.5,
    },
    pageButtonActive: {
      backgroundColor: themeStyles.primary,
      borderColor: themeStyles.primary,
    },
    pageButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeStyles.text,
    },
    pageButtonTextActive: {
      color: '#fff',
    },
    errorContainer: {
      padding: 16,
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(239, 68, 68, 0.3)',
      margin: 16,
    },
    errorText: {
      color: '#ef4444',
      fontSize: 14,
      textAlign: 'center',
    },
  });
};