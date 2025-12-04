import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack.js';
import AppTabs from './AppTabs';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function RootNavigator() {
	const { initializing, userToken } = useAuth();

	// Пока идет инициализация — показываем Splash
	if (initializing) return <SplashScreen />;

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userToken == null ? (
			// если не в системе — стэк авторизации
				<Stack.Screen name="Auth" component={AuthStack} />
			) : (
			// если в системе — главное приложение
				<Stack.Screen name="App" component={AppTabs} />
			)}
		</Stack.Navigator>
	);
}