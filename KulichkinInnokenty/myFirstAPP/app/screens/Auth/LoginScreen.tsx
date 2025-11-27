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

export default function LoginScreen({ navigation }: any) {
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
			Alert.alert("Ошибка", error instanceof Error ? error.message : "Не удалось войти");
		}
	};

	const handleDemoLogin = () => {
		setEmail("demo@example.com");
		setPassword("demo123");
		Alert.alert("Демо", 'Данные заполнены! Нажмите "Войти"');
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.title}>Добро пожаловать</Text>
					<Text style={styles.subtitle}>Войдите в свой аккаунт</Text>
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Вход в систему</Text>

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

					{isLoading && (
						<View style={styles.loadingContainer}>
							<ActivityIndicator color="#007AFF" />
							<Text style={styles.loadingText}>Вход...</Text>
						</View>
					)}

					<View style={styles.buttonGroup}>
						<Button title={isLoading ? "Вход..." : "Войти"} onPress={handleLogin} disabled={isLoading} />
					</View>

					<View style={styles.buttonGroup}>
						<Button title="Заполнить демо данные" onPress={handleDemoLogin} color="#FF9500" disabled={isLoading} />
					</View>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Нет аккаунта?</Text>
					<Button title="Зарегистрироваться" onPress={() => navigation.navigate("Register")} disabled={isLoading} />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
