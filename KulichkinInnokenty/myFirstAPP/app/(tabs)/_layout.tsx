import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import useThemeStore from "../../store/themeStore";

export default function TabLayout() {
	const { colors } = useThemeStore();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.textPrimary,
				tabBarInactiveTintColor: colors.textTertiary,
				tabBarStyle: {
					backgroundColor: colors.backgroundElevated,
					borderTopColor: colors.border,
				},
				headerShown: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "HOME",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="h.square.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					href: null, // Скрыть из табов
				}}
			/>
			<Tabs.Screen
				name="Posts/MyPosts"
				options={{
					title: "MY POSTS",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="person.text.rectangle.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="Posts/AllPosts"
				options={{
					title: "POSTS",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="doc.text.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="UseState/index"
				options={{
					title: "USE STATE",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="s.square.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="UseEffect/index"
				options={{
					title: "USE EFFECT",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="e.square.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="UseMemo/index"
				options={{
					title: "USE MEMO",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="m.square.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="Zustand/index"
				options={{
					title: "ZUSTAND",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="z.square.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="Auth/LoginScreen"
				options={{
					title: "LOGIN",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="person.crop.circle.fill.badge.checkmark"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="Auth/RegisterScreen"
				options={{
					title: "REGISTER",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={28}
							name="person.crop.circle.fill.badge.plus"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
