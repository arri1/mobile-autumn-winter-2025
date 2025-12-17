import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/contexts/theme-context';
import useAuthStore from '@/store/authStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="authorization/login"
            options={{
              title: 'Вход',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="authorization/register"
            options={{
              title: 'Регистрация',
              presentation: 'card', 
            }}
          />
          <Stack.Screen
            name="authorization/profile"
            options={{
              title: 'Профиль',
              presentation: 'card',
            }}
          />
        </Stack>
        
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </GestureHandlerRootView>
    
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
