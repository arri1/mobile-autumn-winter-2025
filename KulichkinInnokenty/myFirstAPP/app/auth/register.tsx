import React, { useState } from "react";
import { View, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Container, Card, Button, Input, H1, H2, Caption } from "../../components/ui";

export default function RegisterScreen() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleRegister = async () => {
		if (!name.trim()) {
			Alert.alert("Ошибка", "Введите имя");
			return;
		}
		if (!email.trim()) {
			Alert.alert("Ошибка", "Введите email");
			return;
		}
		if (!email.includes("@")) {
			Alert.alert("Ошибка", "Введите корректный email");
			return;
		}
		if (!password.trim()) {
			Alert.alert("Ошибка", "Введите пароль");
			return;
		}
		if (password.length < 6) {
			Alert.alert("Ошибка", "Пароль должен содержать минимум 6 символов");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Ошибка", "Пароли не совпадают");
			return;
		}

		setIsLoading(true);
		try {
			// Имитация регистрации
			await new Promise(resolve => setTimeout(resolve, 1000));
			Alert.alert(
				"Успех",
				"Регистрация прошла успешно! Теперь вы можете войти.",
				[
					{
						text: "OK",
						onPress: () => router.push("/auth/login"),
					},
				]
			);
		} catch (error) {
			Alert.alert("Ошибка", "Не удалось зарегистрироваться");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<Container scrollable padding="md">
				<View style={styles.header}>
					<H1>Регистрация</H1>
					<Caption color="secondary">Создайте новый аккаунт</Caption>
				</View>

				<Card variant="outlined">
					<H2 style={styles.cardTitle}>Данные пользователя</H2>

					<Input
						label="Имя"
						placeholder="Введите имя"
						value={name}
						onChangeText={setName}
						autoCapitalize="words"
						editable={!isLoading}
					/>

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
						placeholder="Минимум 6 символов"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						editable={!isLoading}
						helperText="Минимум 6 символов"
					/>

					<Input
						label="Подтвердите пароль"
						placeholder="Повторите пароль"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
						editable={!isLoading}
					/>

					<View style={styles.buttonStack}>
						<Button
							title={isLoading ? "Регистрация..." : "Зарегистрироваться"}
							onPress={handleRegister}
							disabled={isLoading}
							loading={isLoading}
							variant="primary"
							size="lg"
						/>
					</View>
				</Card>

				<Card variant="outlined">
					<View style={styles.footer}>
						<Caption color="secondary">Уже есть аккаунт?</Caption>
						<Button
							title="Войти"
							onPress={() => router.push("/auth/login")}
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
