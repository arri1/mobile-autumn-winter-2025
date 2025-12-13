import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import RootTabs from './src/navigation/RootTabs';
import AuthNavigator from './src/navigation/AuthNavigator';
import useAuthStore from './src/store/authStore';
import { View, ActivityIndicator } from 'react-native';

const LoadingContainer = styled.View`
  flex: 1;
  background-color: #0a0c10;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: #9aa4b2;
  margin-top: 16px;
  font-size: 16px;
`;

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Инициализируем состояние аутентификации при загрузке
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#5EEAD4" />
        <LoadingText>Загрузка...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#0a0c10" />
      {isAuthenticated ? <RootTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}