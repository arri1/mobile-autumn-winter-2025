import React, { useState } from "react";
import { View, Text, Button, Alert, TextInput, ScrollView, ActivityIndicator } from "react-native";
import useAuthStore from "../../../store/authStore";
import { styles } from "./styles";

export default function ZustandLab() {
	// Получаем состояние и действия из Zustand store
	const { user, isAuthenticated, login, logout, isLoading, error, clearError } = useAuthStore();

	// Локальное состояние для формы входа
	const [email, setEmail] = useState("admin@example.com");
	const [password, setPassword] = useState("admin123");

	// Обработчик входа
	const handleLogin = async () => {
		try {
			await login({ email, password });
			Alert.alert("Успех", "Вы успешно вошли в систему!");
		} catch (error) {
			Alert.alert("Ошибка", error instanceof Error ? error.message : "Неизвестная ошибка");
		}
	};

	// Обработчик выхода
	const handleLogout = () => {
		logout();
		Alert.alert("Информация", "Вы вышли из системы");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{/* Карточка состояния аутентификации */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Состояние аутентификации</Text>
				<Text style={styles.infoText}>Аутентифицирован: {isAuthenticated ? "Да ✅" : "Нет ❌"}</Text>

				{user && (
					<>
						<Text style={styles.successText}>Пользователь авторизован</Text>
						<Text style={styles.infoText}>Имя: {user.name}</Text>
						<Text style={styles.infoText}>Email: {user.email}</Text>
						<Text style={styles.infoText}>Роль: {user.role}</Text>
					</>
				)}

				{isLoading && (
					<View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
						<ActivityIndicator color="#007AFF" />
						<Text style={[styles.infoText, { marginLeft: 10, marginBottom: 0 }]}>Загрузка...</Text>
					</View>
				)}

				{error && <Text style={styles.errorText}>Ошибка: {error}</Text>}
			</View>

			{/* Карточка с формой входа */}
			{!isAuthenticated ? (
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Вход в систему</Text>

					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="admin@example.com"
						placeholderTextColor="#999"
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!isLoading}
					/>

					<Text style={styles.label}>Пароль</Text>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="admin123"
						placeholderTextColor="#999"
						secureTextEntry
						editable={!isLoading}
					/>

					<View style={styles.buttonGroup}>
						<Button title={isLoading ? "Вход..." : "Войти"} onPress={handleLogin} disabled={isLoading} />
					</View>
				</View>
			) : (
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Действия</Text>
					<View style={styles.buttonGroup}>
						<Button title="Выйти" onPress={handleLogout} color="#FF3B30" />
					</View>
				</View>
			)}

			{/* Карточка с очисткой ошибки */}
			{error && (
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Управление ошибками</Text>
					<View style={styles.buttonGroup}>
						<Button title="Очистить ошибку" onPress={clearError} color="#FF9500" />
					</View>
				</View>
			)}
		</ScrollView>
	);
}
