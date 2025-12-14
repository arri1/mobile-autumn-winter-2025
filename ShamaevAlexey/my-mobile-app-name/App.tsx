import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { useAuthStore } from './src/store/useAuthStore';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import ProfileScreen from './src/screens/ProfileScreen';
import UseStateScreen from './src/screens/useState';
import UseEffectScreen from './src/screens/useEffect';
import UseMemoScreen from './src/screens/useMemo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f0f0f0' },
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="State"
        component={UseStateScreen}
        options={{
          title: 'UseState',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="Effect"
        component={UseEffectScreen}
        options={{
          title: 'UseEffect',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>⏰</Text>,
        }}
      />
      <Tab.Screen
        name="Memo"
        component={UseMemoScreen}
        options={{
          title: 'UseMemo',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>🧠</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { initAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}