import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/useAppStore';
import { appStyles, darkThemeStyles, lightThemeStyles } from '../styles/appStyles';
import { createNavigationStyles } from '../styles/navigationStyles'

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ZustandScreen from '../screens/ZustandScreen';
import UseStateScreen from '../screens/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Zustand: undefined;
  UseState: undefined;
  UseEffect: undefined;
  UseMemo: undefined;
};


const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

type TabIconProps = {
  focused: boolean;
  routeName: string;
};

const TabIconWithText: React.FC<TabIconProps> = ({ focused, routeName }) => {
  const { theme } = useAppStore();
  const styles = createNavigationStyles(theme);
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  
  const getIconForRoute = (route: string): string => {
    switch (route) {
      case 'Zustand':
        return 'Z';
      case 'UseState':
        return 'S';
      case 'UseEffect':
        return 'E';
      case 'UseMemo':
        return 'M';
      default:
        return '?';
    }
  };

  const getLabelForRoute = (route: string): string => {
    switch (route) {
      case 'Zustand':
        return 'Zustand';
      case 'UseState':
        return 'State';
      case 'UseEffect':
        return 'Effect';
      case 'UseMemo':
        return 'Memo';
      default:
        return route;
    }
  };

  const iconText = getIconForRoute(routeName);

  return (
    <View style={styles.tabContainer}>
      <View style={[styles.tabIconContainer, { 
        backgroundColor: focused ? themeStyles.primary : 'transparent',
        borderColor: focused ? themeStyles.primary : themeStyles.border
      }]}>
        <Text style={[styles.tabIconText, { 
          color: focused ? themeStyles.background : themeStyles.secondary 
        }]}>
          {iconText}
        </Text>
      </View>
      <Text style={[
        styles.tabLabel,
        { color: focused ? themeStyles.primary : themeStyles.secondary }
      ]}>
        {getLabelForRoute(routeName)}
      </Text>
    </View>
  );
};

const AuthNavigator: React.FC = () => {
  const { theme } = useAppStore();
  const styles = createNavigationStyles(theme);
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeStyles.card,
        },
        headerTintColor: themeStyles.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: themeStyles.text,
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: themeStyles.background,
        },
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Вход в систему',
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Регистрация',
          headerBackTitle: 'Назад',
          headerShown: true,
        }}
      />
    </AuthStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  const { theme } = useAppStore();
  const styles = createNavigationStyles(theme);
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: themeStyles.card,
          shadowColor: themeStyles.shadowColor,
          shadowOpacity: themeStyles.shadowOpacity,
          shadowRadius: themeStyles.shadowRadius,
          shadowOffset: themeStyles.shadowOffset,
          elevation: 3,
        },
        headerTintColor: themeStyles.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: themeStyles.text,
        },
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: themeStyles.card,
          borderTopColor: themeStyles.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused }) => (
          <TabIconWithText focused={focused} routeName={route.name} />
        ),
        tabBarLabel: () => null,
      })}
    >
      <MainTab.Screen
        name="Zustand"
        component={ZustandScreen}
        options={{
          title: 'Zustand',
        }}
      />
      <MainTab.Screen
        name="UseState"
        component={UseStateScreen}
        options={{
          title: 'useState',
        }}
      />
      <MainTab.Screen
        name="UseEffect"
        component={UseEffectScreen}
        options={{
          title: 'useEffect',
        }}
      />
      <MainTab.Screen
        name="UseMemo"
        component={UseMemoScreen}
        options={{
          title: 'useMemo',
        }}
      />
    </MainTab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { theme } = useAppStore();
  const styles = createNavigationStyles(theme);
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: themeStyles.background }]}>
        <View style={[styles.loadingCard, { backgroundColor: themeStyles.card }]}>
          <ActivityIndicator size="large" color={themeStyles.primary} />
          <Text style={[styles.loadingText, { color: themeStyles.text }]}>Загрузка...</Text>
          <Text style={[styles.loadingSubtext, { color: themeStyles.secondary }]}>
            Проверка авторизации
          </Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;