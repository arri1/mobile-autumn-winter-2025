import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 60,
					backgroundColor: '#fff',
				},
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') iconName = 'home';
					else if (route.name === 'Shop') iconName = 'pricetags';
					else if (route.name === 'Cart') iconName = 'cart';
					else if (route.name === 'Profile') iconName = 'person';

					return <Ionicons name={iconName} size={24} color={focused ? '#3498db' : '#999'} />;
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Shop" component={ShopScreen} />
			<Tab.Screen name="Cart" component={CartScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}
