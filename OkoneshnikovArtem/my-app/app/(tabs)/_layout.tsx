import { Tabs } from "expo-router";
import React from "react";
import { Image } from "expo-image";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/Home.svg')}
							style={{ width: 28, height: 28, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="register"
				options={{
					title: "Register",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/R.svg')}
							style={{ width: 28, height: 28, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="login"
				options={{
					title: "Login",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/L.svg')}
							style={{ width: 28, height: 28, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/User.svg')}
							style={{ width: 28, height: 28, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="UseEffect"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="UseMemo"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="UseState"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="Zustand"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
