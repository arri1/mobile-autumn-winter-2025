import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
	const { initializing, userToken } = useAuth();

	if (initializing) return <SplashScreen />;

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{userToken == null ? (
				<Stack.Screen name="Auth" component={AuthStack} />
			) : (
				<Stack.Screen name="App" component={AppTabs} />
			)}
		</Stack.Navigator>
	);
}
