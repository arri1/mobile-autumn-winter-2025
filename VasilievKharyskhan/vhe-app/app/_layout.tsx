import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router'; // Заменили Stack на Slot
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native'; // Добавили для лоадера
import { GlobalAlertComponent } from '@/components/GlobalAlert';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/contexts/theme-context';
import useAuthStore from '@/store/authStore';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();

  // Достаем данные из authStore
  const { isAuthenticated, isInitialized, initializeAuth } = useAuthStore();

  // 1. Инициализация (проверка токена) при запуске
  useEffect(() => {
    initializeAuth();
  }, []);

  // 2. Логика защиты (Редиректы)
  useEffect(() => {
    if (!isInitialized) return; // Ждем окончания проверки

    // Проверяем, находимся ли мы сейчас в группе (auth)
    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && inAuthGroup) {
      // Пользователь авторизован, но находится на экране входа -> кидаем в приложение
      router.replace('/(tabs)');
    } else if (!isAuthenticated && !inAuthGroup) {
      // Пользователь НЕ авторизован, но пытается зайти в приложение -> кидаем на вход
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, segments, isInitialized]);

  // 3. Экран загрузки (показываем, пока идет initializeAuth)
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 4. Основной рендер
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Slot отрисует либо группу (tabs), либо (auth), в зависимости от URL */}
        <Slot /> 
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
      <GlobalAlertComponent />
    </ThemeProvider>
  );
}