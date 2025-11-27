import React, { useState } from "react";
import { View, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/authStore";
import { Container, Card, Button, Input, H1, H2, Body, Caption } from "../../components/ui";

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
			router.back();
		} catch (error) {
			Alert.alert("Ошибка", error instanceof Error ? error.message : "Не удалось войти");
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
			<Container scrollable padding="md">
				<View style={styles.header}>
					<H1>Вход</H1>
					<Caption color="secondary">Войдите в свой аккаунт</Caption>
				</View>

				<Card variant="outlined">
					<H2 style={styles.cardTitle}>Авторизация</H2>

					<Input
						label="Email"
						placeholder="Введите email"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						editable={!isLoading}
					/>

					<Input
						label="Пароль"
						placeholder="Введите пароль"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						editable={!isLoading}
					/>

					<View style={styles.buttonStack}>
						<Button
							title={isLoading ? "Вход..." : "Войти"}
							onPress={handleLogin}
							disabled={isLoading}
							loading={isLoading}
							variant="primary"
							size="lg"
						/>

						<Button
							title="Заполнить демо данные"
							onPress={handleDemoLogin}
							disabled={isLoading}
							variant="ghost"
							size="md"
						/>
					</View>
				</Card>

				<Card variant="outlined">
					<View style={styles.footer}>
						<Caption color="secondary">Нет аккаунта?</Caption>
						<Button
							title="Зарегистрироваться"
							onPress={() => router.push("/auth/register")}
							disabled={isLoading}
							variant="outline"
							size="md"
						/>
					</View>
				</Card>
			</Container>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	cardTitle: {
		marginBottom: 24,
	},
	buttonStack: {
		gap: 12,
		marginTop: 8,
	},
	footer: {
		gap: 16,
		alignItems: 'center',
	},
});
