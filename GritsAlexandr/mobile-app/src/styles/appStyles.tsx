import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    borderTopWidth: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabIconFocused: {
    
  },
  tabIconText: {
    fontSize: 14,
    fontWeight: 700,
  },
  tabIconTextFocused: {
    
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 600,
  },
  tabLabelFocused: {
    
  },
});

export const darkThemeStyles = {
  background: '#0f172a',
  text: '#f8fafc',
  card: '#1e293b',
  border: '#334155',
  primary: '#3b82f6',
  secondary: '#94a3b8',
};

// Стили для светлой темы
export const lightThemeStyles = {
  background: '#ffffff',
  text: '#0f172a',
  card: '#f8fafc',
  border: '#e5e7eb',
  primary: '#2563eb',
  secondary: '#64748b',
};