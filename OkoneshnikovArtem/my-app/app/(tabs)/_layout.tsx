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
							style={{ width: 16, height: 16, tintColor: color }}
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
							style={{ width: 10, height: 17, tintColor: color }}
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
							style={{ width: 10, height: 17, tintColor: color }}
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
							style={{ width: 16, height: 16, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="UseEffect"
				options={{
					title: "UseEffect",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 16, height: 16, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="UseMemo"
				options={{
					title: "UseMemo",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 16, height: 16, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="UseState"
				options={{
					title: "UseState",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 16, height: 16, tintColor: color }}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Zustand"
				options={{
					title: "Zustand",
					tabBarIcon: ({ color }) => (
						<Image
							source={require('@/assets/images/folder.svg')}
							style={{ width: 16, height: 16, tintColor: color }}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
