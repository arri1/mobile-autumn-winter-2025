import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/useTheme';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
	const { colors } = useTheme();

	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
			headerShown: false,
			tabBarShowLabel: false,
			tabBarStyle: {
				height: 64,
				borderTopLeftRadius: 16,
				borderTopRightRadius: 16,
				position: 'relative',
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: colors.tabBar,
				shadowColor: '#000',
				shadowOpacity: 0.06,
				shadowOffset: { width: 0, height: -2 },
				elevation: 5,
			},
			tabBarIcon: ({ focused, color, size }) => {
				let name;
				if (route.name === 'Home') name = 'home';
				else if (route.name === 'Shop') name = 'pricetags';
				else if (route.name === 'Cart') name = 'cart';
				else if (route.name === 'Profile') name = 'person';
				return (
					<Ionicons
						name={name}
						size={24}
						color={focused ? colors.primary : colors.gray}
					/>
				);
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