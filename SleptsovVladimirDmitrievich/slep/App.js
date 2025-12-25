import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/site/User/LoginScreen';
import RegisterScreen from './src/site/User/RegisterScreen';
import RootTabs from './src/nav/root';
import useAuthStore from './src/auth/auth';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#222222ff'  },
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
  const { 
    isAuthenticated, 
    isLoading, 
    initializeAuth 
  } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00ff" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      {isAuthenticated ? (
        <RootTabs />
      ) : (
        <AuthTabs />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#E6E9EF',
    marginTop: 16,
    fontSize: 16,
  },
});