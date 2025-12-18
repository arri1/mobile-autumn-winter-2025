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

export const themeStyles = {
  background: '#ffffff',
  text: '#0f172a',
  card: '#f8fafc',
  border: '#cbccceff',
  primary: '#2563eb',
  secondary: '#747C88',
  success: '#22c55e',
  warning: '#f97316',
  error: '#ef4444',

  borderRadius: 12,
  padding: 16,
  margin: 8,
  
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 8 },
};

export const lightThemeStyles = themeStyles
export const darkThemeStyles = {
  background: '#0f172a',
  text: '#f8fafc',
  card: '#1e293b',
  border: '#334155',
  primary: '#3b82f6',
  secondary: '#94a3b8',
  success: '#22c55e',
  warning: '#f97316',
  error: '#ef4444',

  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 8 },

  borderRadius: 12,
  padding: 16,
  margin: 8,


};

