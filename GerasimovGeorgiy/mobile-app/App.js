import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import RootTabs from './src/navigation/RootTabs';
import AuthNavigator from './src/navigation/AuthNavigator';
import CallScreen from './src/screens/Call/CallScreen';
import useAuthStore from './src/store/authStore';

const Stack = createStackNavigator();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0D0F14' },
            headerTintColor: '#E6E9EF',
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={RootTabs} />
          <Stack.Screen
            name="Call"
            component={CallScreen}
            options={{
              headerShown: true,
              title: 'Звонок',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}
