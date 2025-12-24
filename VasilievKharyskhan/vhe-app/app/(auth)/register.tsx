import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import useAuthStore from '@/store/authStore';
export default function RegisterScreen() {
	const router = useRouter();
	const { login, register, isLoading } = useAuthStore();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

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

		try {
			// Сначала регистрируем пользователя
			await register({ name, email, password });
			
			// Затем автоматически входим
			await login({ email, password });
			
			Alert.alert('Успех', 'Регистрация прошла успешно!');
			router.back();
		} catch (error) {
			Alert.alert("Ошибка",  error.message || 'Не удалось зарегистрироваться');
		}
	};
	const handleDemoFill = () => {
		setName('Демо Пользователь');
		setEmail('demo@example.com');
		setPassword('demo123');
		setConfirmPassword('demo123');
		Alert.alert('Демо', 'Данные заполнены! Нажмите "Зарегистрироваться"');
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ThemedView style={styles.container}>
				<View style={styles.header}>
					<ThemedText style={styles.mainTitle}>Регистрация</ThemedText>
					<ThemedText style={styles.cardTitle}>Создайте новый аккаунт</ThemedText>
				</View>

				<ThemedView style={styles.card}>
					<ThemedText style={styles.label}>Имя</ThemedText>
					<TextInput
						style={styles.input}
						placeholder="Введите имя"
						value={name}
						onChangeText={setName}
						autoCapitalize="words"
						editable={!isLoading}
					/>
					<ThemedText style={styles.label}>Email</ThemedText>
					<TextInput
						style={styles.input}
						placeholder="Введите email"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						editable={!isLoading}
					/>
					<ThemedText style={styles.label}>Пароль</ThemedText>
					<TextInput
						style={styles.input}
						placeholder="Минимум 6 символов"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						editable={!isLoading}
					/>
					<TextInput
						style={styles.input}
						placeholder="Повторите пароль"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
						editable={!isLoading}
					/>

					<ThemedView style={styles.buttonStack}>
						<Button
							title={isLoading ? "Регистрация..." : "Зарегистрироваться"}
							onPress={handleRegister}
							disabled={isLoading}
						/>
						<Button
							title="Заполнить демо данные"
							onPress={handleDemoFill}
							disabled={isLoading}
						/>
					</ThemedView>
					
				</ThemedView>

				<ThemedView style={styles.card}>
					<View style={styles.footer}>
						<ThemedText >Уже есть аккаунт?</ThemedText>
						<Button
							title="Войти"
							onPress={() => router.push("/authorization/login")}
							disabled={isLoading}
						/>
					</View>
				</ThemedView>
			</ThemedView>
		</KeyboardAvoidingView>
	);
}