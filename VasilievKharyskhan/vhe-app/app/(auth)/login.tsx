import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/authStore";
import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export default function LoginScreen() {
	const router = useRouter();
	const { login, isLoading } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		if (!email.trim()) {
			Alert.alert("Ошибка", "Введите email");
			return;
		}
		if (!password.trim()) {
			Alert.alert("Ошибка", "Введите пароль");
			return;
		}
		if (!email.includes("@")) {
			Alert.alert("Ошибка", "Введите корректный email");
			return;
		}
		if (password.length < 6) {
			Alert.alert("Ошибка", "Пароль должен содержать минимум 6 символов");
			return;
		}

		try {
			await login({ email, password });
			
			Alert.alert("Успех", "Вы успешно вошли в систему!");
		} catch (error) {
			Alert.alert(
				"Ошибка",
				error instanceof Error ? error.message : "Не удалось войти"
			);
		}
	};

	const handleDemoLogin = () => {
		setEmail("demo@example.com");
		setPassword("demo123");
		Alert.alert("Демо", 'Данные заполнены! Нажмите "Войти"');
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ThemedView style={styles.container}>

				<ThemedView style={styles.card}>
					<ThemedText style={styles.mainTitle}>Авторизация</ThemedText>
                    <ThemedText style={styles.label}>Email</ThemedText>
					<TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isLoading}
                    />

					<TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#999"
                        secureTextEntry
                        editable={!isLoading}
                    />

					<ThemedView style={styles.buttonStack}>
						<Button
							title={isLoading ? "Вход..." : "Войти"}
							onPress={handleLogin}
							disabled={isLoading}
						/>

						<Button
							title="Заполнить демо данные"
							onPress={handleDemoLogin}
							disabled={isLoading}
						/>
					</ThemedView>
				</ThemedView>

				<ThemedView style={styles.card}>
					<View style={styles.footer}>
						<ThemedText style={styles.cardTitle}>Нет аккаунта?</ThemedText>
						<Button
							title="Зарегистрироваться"
							onPress={() => router.push("/(auth)/register")}
							disabled={isLoading}
						/>
					</View>
				</ThemedView>
			</ThemedView>
		</KeyboardAvoidingView>
	);
}