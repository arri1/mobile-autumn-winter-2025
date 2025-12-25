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
							style={{ width: 24, height: 24, tintColor: color }}
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
							style={{ width: 24, height: 24, tintColor: color }}
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
							style={{ width: 24, height: 24, tintColor: color }}
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
							style={{ width: 24, height: 24, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="UseEffect"
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 24, height: 24, tintColor: color }}
						/>
					),
					href: null,
				}}
			/>
			<Tabs.Screen
				name="UseMemo"
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 24, height: 24, tintColor: color }}
						/>
					),
					href: null,
				}}
			/>
			<Tabs.Screen
				name="UseState"
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 24, height: 24, tintColor: color }}
						/>
					),
					href: null,
				}}
			/>
			<Tabs.Screen
				name="Zustand"
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 24, height: 24, tintColor: color }}
						/>
					),
					href: null,
				}}
			/>
		</Tabs>
	);
}
