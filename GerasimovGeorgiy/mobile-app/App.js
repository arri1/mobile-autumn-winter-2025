import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootTabs from './src/navigation/RootTabs';
import AuthNavigator from './src/navigation/AuthNavigator';
import useAuthStore from './src/store/authStore';

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      {isAuthenticated ? <RootTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
