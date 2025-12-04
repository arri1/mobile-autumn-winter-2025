import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, View } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from './src/auth/auth';
import LoginScreen from './src/site/user/registerscreen';
import RegisterScreen from './src/site/user/loginscreen';
import RootTabs from './src/nav/root';
import { Text,StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0D0F14' },
        headerTintColor: '#E6E9EF',
        tabBarStyle: { display: 'none' },
        tabBarActiveTintColor: '#00ff00ff',
        tabBarInactiveTintColor: '#9AA4B2',
      }}
    >
      <Tab.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Вход' }}
      />
      <Tab.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Регистрация' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <NavigationContainer>
      {user ? <RootTabs/> : <AuthTabs/>}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}