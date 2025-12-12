
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { useAuthStore } from '../backend/auth';
import { AppStyles } from '../styles/AppStyles';

const Drawer = createDrawerNavigator();

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  
  return (
    <TouchableOpacity 
      onPress={logout} 
      style={AppStyles.logoutButton}
    >
      <Text style={AppStyles.logoutText}>Выход</Text>
    </TouchableOpacity>
  );
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: AppStyles.headerTitle,
        headerRight: () => <LogoutButton />,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#8E8E93',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Главная',
          drawerLabel: 'Главная',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={HomeScreen} 
        options={{
          title: 'Профиль',
          drawerLabel: 'Профиль',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={HomeScreen} 
        options={{
          title: 'Настройки',
          drawerLabel: 'Настройки',
        }}
      />
    </Drawer.Navigator>
  );
}