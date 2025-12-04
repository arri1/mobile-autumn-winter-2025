import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import useThemeStore from "../store/themeStore";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const { theme, loadTheme } = useThemeStore();

	useEffect(() => {
		loadTheme();
	}, []);

	const navigationTheme =
		theme === "dark"
			? {
					...DarkTheme,
					colors: {
						...DarkTheme.colors,
						background: "#0A0A0A",
						card: "#1A1A1A",
						border: "#262626",
					},
			  }
			: {
					...DefaultTheme,
					colors: {
						...DefaultTheme.colors,
						background: "#FAFAFA",
						card: "#FFFFFF",
						border: "#E5E5E5",
					},
			  };

	return (
		<ThemeProvider value={navigationTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
				<Stack.Screen
					name="auth/login"
					options={{
						title: "Вход",
						presentation: "card",
					}}
				/>
				<Stack.Screen
					name="auth/register"
					options={{
						title: "Регистрация",
						presentation: "card",
					}}
				/>
				<Stack.Screen
					name="auth/profile"
					options={{
						title: "Профиль",
						presentation: "card",
					}}
				/>
			</Stack>
			<StatusBar style={theme === "dark" ? "light" : "dark"} />
		</ThemeProvider>
	);
}
