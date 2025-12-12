import 'react-native-gesture-handler';
import React, { useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { 
  createDrawerNavigator, 
  DrawerNavigationOptions 
} from '@react-navigation/drawer';
import { 
  createNativeStackNavigator, 
  NativeStackNavigationOptions 
} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ActivityIndicator 
} from 'react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegistrerScreen';
import { useAuthStore, AuthState } from './src/backend/auth';
import { AppStyles } from './src/styles/AppStyles';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomeDrawer: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const LogoutButton = () => {
  const logout = useAuthStore((state: AuthState) => state.logout);
  
  return (
    <TouchableOpacity 
      onPress={logout} 
      style={AppStyles.logoutButton}
      testID="logout-button"
    >
      <Text style={AppStyles.logoutText}>Выход</Text>
    </TouchableOpacity>
  );
};

const AuthenticatedDrawer = () => {
  const drawerScreenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      headerTitleAlign: 'center',
      headerTitleStyle: AppStyles.headerTitle,
      headerRight: () => <LogoutButton />,
      drawerActiveTintColor: '#007AFF',
      drawerInactiveTintColor: '#8E8E93',
    }),
    []
  );

  return (
    <Drawer.Navigator screenOptions={drawerScreenOptions}>
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
};

const AuthStack = () => {
  const stackScreenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerTitleAlign: 'center',
      headerTitleStyle: AppStyles.headerTitle,
      headerBackTitleVisible: false,
      animation: 'slide_from_right',
    }),
    []
  );

  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Вход',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Регистрация',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isNavigationReady, setIsNavigationReady] = useState<boolean>(false);
  
  const user = useAuthStore((state: AuthState) => state.user);
  const isLoading = useAuthStore((state: AuthState) => state.isLoading);
  const checkAuth = useAuthStore((state: AuthState) => state.checkAuth);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.warn('Ошибка при подготовке приложения:', error);
      } finally {
        setIsNavigationReady(true);
      }
    };

    prepareApp();
  }, [checkAuth]);

  useEffect(() => {
    console.log('Состояние аутентификации:', { 
      isAuthenticated: !!user, 
      userId: user?.id,
      isLoading 
    });
  }, [user, isLoading]);

  const Navigator = useMemo(() => {
    if (!isNavigationReady || isLoading) {
      return null;
    }
    return user ? <AuthenticatedDrawer /> : <AuthStack />;
  }, [isNavigationReady, isLoading, user]);

  if (!isNavigationReady || isLoading) {
    return (
      <View style={AppStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={AppStyles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={AppStyles.container}>
      <NavigationContainer>
        {Navigator}
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}