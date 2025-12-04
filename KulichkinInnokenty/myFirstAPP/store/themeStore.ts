import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/colors';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  colors: typeof Colors.light;

  // Actions
  setTheme: (theme: Theme) => Promise<void>;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
}

const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  colors: Colors.dark,

  setTheme: async (theme: Theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);
      set({
        theme,
        colors: theme === 'dark' ? Colors.dark : Colors.light,
      });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },

  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    await get().setTheme(newTheme);
  },

  loadTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        set({
          theme: savedTheme,
          colors: savedTheme === 'dark' ? Colors.dark : Colors.light,
        });
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  },
}));

export default useThemeStore;
