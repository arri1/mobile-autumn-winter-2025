import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

// Создаем экземпляр Stack Navigator для навигации между экранами
const Stack = createStackNavigator();

// Основной компонент навигатора для авторизации
export default function AuthNavigator() {
  return (
    <Stack.Navigator // контейнер для управления стеком экранов
      screenOptions={{ // общие настройки для всех экранов в этом навигаторе
        headerShown: false, // Скрываем заголовок (шапку) на всех экранах
        cardStyle: { backgroundColor: '#1a1a1a' }, // Фоновый цвет
        animationEnabled: true, // Включаем анимации переходов между экранами
      }}
    >
      <Stack.Screen // определяем экран в стеке навигации
        name="Auth" // уникальное имя экрана для навигации
        component={AuthScreen} //компонент, который будет отрисовываться при переходе на этот экран
      />
    </Stack.Navigator>
  );
}