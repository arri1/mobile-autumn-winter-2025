import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import UseStateContainer from '@/screens/UseState/UseStateContainer';
import UseEffectContainer from '@/screens/UseEffect/UseEffectContainer';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="UseState"
        component={UseStateContainer}
        options={{
          title: 'useState',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="inbox"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UseEffect"
        component={UseEffectContainer}
        options={{
          title: 'useEffect',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cloud"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
