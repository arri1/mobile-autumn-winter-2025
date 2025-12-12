import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UseStateScreen from '../screens/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoScreen';
import ZustandScreen from '../screens/ZustandScreen';
import { useAppStore } from '../store/useAppStore';
import { getIconText, getIconStyles, getTabBarStyle } from '../styles/navigationStyles';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme } = useAppStore();
  
  // Получаем тему из appStyles
  const themeStyles = theme === 'dark' 
    ? { primary: '#3b82f6', secondary: '#94a3b8', card: '#1e293b', border: '#334155' }
    : { primary: '#2563eb', secondary: '#64748b', card: '#f8fafc', border: '#e5e7eb' };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: getTabBarStyle(themeStyles),
          tabBarActiveTintColor: themeStyles.primary,
          tabBarInactiveTintColor: themeStyles.secondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="UseState"
          component={UseStateScreen}
          options={{
            tabBarLabel: 'State',
            tabBarIcon: ({ focused, size }) => {
              const iconStyles = getIconStyles(focused, themeStyles);
              return (
                <View style={iconStyles.container}>
                  <Text style={iconStyles.text}>{getIconText('UseState')}</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="UseEffect"
          component={UseEffectScreen}
          options={{
            tabBarLabel: 'Effect',
            tabBarIcon: ({ focused, size }) => {
              const iconStyles = getIconStyles(focused, themeStyles);
              return (
                <View style={iconStyles.container}>
                  <Text style={iconStyles.text}>{getIconText('UseEffect')}</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="UseMemo"
          component={UseMemoScreen}
          options={{
            tabBarLabel: 'Memo',
            tabBarIcon: ({ focused, size }) => {
              const iconStyles = getIconStyles(focused, themeStyles);
              return (
                <View style={iconStyles.container}>
                  <Text style={iconStyles.text}>{getIconText('UseMemo')}</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Zustand"
          component={ZustandScreen}
          options={{
            tabBarLabel: 'Zustand',
            tabBarIcon: ({ focused, size }) => {
              const iconStyles = getIconStyles(focused, themeStyles);
              return (
                <View style={iconStyles.container}>
                  <Text style={iconStyles.text}>{getIconText('Zustand')}</Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;