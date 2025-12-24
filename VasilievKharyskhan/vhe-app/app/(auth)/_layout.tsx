// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Создание аккаунта',
          headerBackTitle: 'Назад',
          headerTintColor: '#007AFF' // Цвет кнопки назад
        }} 
      />
    </Stack>
  );
}