import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import UseStateScreen from './src/screens/useState';
import UseEffectScreen from './src/screens/useEffect';
import UseMemoScreen from './src/screens/useMemo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#f0f0f0' },
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: '#1976d2',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          },
        }}
      >
        <Tab.Screen
          name="State"
          component={UseStateScreen}
          options={{
            title: 'UseState',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📊</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Effect"
          component={UseEffectScreen}
          options={{
            title: 'UseEffect',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>⏰</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Memo"
          component={UseMemoScreen}
          options={{
            title: 'UseMemo',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🧠</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}