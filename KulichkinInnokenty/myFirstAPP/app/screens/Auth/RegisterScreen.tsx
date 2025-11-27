import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import useAuthStore from "../../../store/authStore";
import { styles } from "./styles";

export default function RegisterScreen({ navigation }: any) {
	const { register, login, isLoading } = useAuthStore();
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
		if (!password.trim()) {
			Alert.alert("Ошибка", "Введите пароль");
			return;
		}
		if (!confirmPassword.trim()) {
			Alert.alert("Ошибка", "Подтвердите пароль");
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
		if (password !== confirmPassword) {
			Alert.alert("Ошибка", "Пароли не совпадают");
			return;
		}

		try {
			// Сначала регистрируем пользователя
			await register({ name, email, password });
			Alert.alert("Успех", "Регистрация прошла успешно!");
		} catch (error) {
			Alert.alert("Ошибка", error instanceof Error ? error.message : "Не удалось зарегистрироваться");
		}
	};

	const handleDemoFill = () => {
		setName("Демо Пользователь");
		setEmail("demo@example.com");
		setPassword("demo123");
		setConfirmPassword("demo123");
		Alert.alert("Демо", 'Данные заполнены! Нажмите "Зарегистрироваться"');
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.title}>Регистрация</Text>
					<Text style={styles.subtitle}>Создайте новый аккаунт</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Новый пользователь</Text>

					<Text style={styles.label}>Имя</Text>
					<TextInput
						style={styles.input}
						placeholder="Введите имя"
						placeholderTextColor="#999"
						value={name}
						onChangeText={setName}
						autoCapitalize="words"
						autoCorrect={false}
						editable={!isLoading}
					/>

					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder="Введите email"
						placeholderTextColor="#999"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						editable={!isLoading}
					/>

					<Text style={styles.label}>Пароль</Text>
					<TextInput
						style={styles.input}
						placeholder="Введите пароль"
						placeholderTextColor="#999"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
						editable={!isLoading}
					/>

					<Text style={styles.label}>Подтвердите пароль</Text>
					<TextInput
						style={styles.input}
						placeholder="Повторите пароль"
						placeholderTextColor="#999"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
						editable={!isLoading}
					/>

					{isLoading && (
						<View style={styles.loadingContainer}>
							<ActivityIndicator color="#007AFF" />
							<Text style={styles.loadingText}>Регистрация...</Text>
						</View>
					)}

					<View style={styles.buttonGroup}>
						<Button
							title={isLoading ? "Регистрация..." : "Зарегистрироваться"}
							onPress={handleRegister}
							disabled={isLoading}
						/>
					</View>

					<View style={styles.buttonGroup}>
						<Button title="Заполнить демо данные" onPress={handleDemoFill} color="#FF9500" disabled={isLoading} />
					</View>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Уже есть аккаунт?</Text>
					<Button title="Войти" onPress={() => navigation.goBack()} disabled={isLoading} />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
