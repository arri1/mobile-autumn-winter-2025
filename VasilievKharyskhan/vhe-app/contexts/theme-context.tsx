import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ColorScheme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  colorScheme: ColorScheme;
  actualColorScheme: 'light' | 'dark';
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('system');

  // Вычисляем актуальную тему
  const actualColorScheme: 'light' | 'dark' =
    colorScheme === 'system'
      ? (systemColorScheme ?? 'light')
      : colorScheme;

  // Переключение между light и dark
  const toggleTheme = () => {
    console.log('toggleTheme called, current:', actualColorScheme);
    if (actualColorScheme === 'light') {
      console.log('Switching to dark');
      setColorScheme('dark');
    } else {
      console.log('Switching to light');
      setColorScheme('light');
    }
  };

  // Логирование изменений темы
  useEffect(() => {
    console.log('Theme changed:', { colorScheme, actualColorScheme });
  }, [colorScheme, actualColorScheme]);

  return (
    <ThemeContext.Provider value={{
      colorScheme,
      actualColorScheme,
      setColorScheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}