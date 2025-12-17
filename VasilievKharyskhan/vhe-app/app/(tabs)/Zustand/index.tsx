
import React, { useState } from "react";
import { Button, Alert, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./_styles";
import useAuthZustandStore from "../../../store/authStoreforZustandScreen";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";

export default function ZustandLab() {
	const { user, isAuthenticated, login, logout, isLoading, error, clearError } = useAuthZustandStore();
	const [email, setEmail] = useState("admin@example.com");
	const [password, setPassword] = useState("admin123");

	const handleLogin = async () => {
		try {
			await login({ email, password });
			Alert.alert("Успех", "Вы успешно вошли в систему!");
		} catch (error) {
			Alert.alert("Ошибка", error instanceof Error ? error.message : "Неизвестная ошибка");
		}
	};

	const handleLogout = () => {
		logout();
		Alert.alert("Информация", "Вы вышли из системы");
	};
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ThemedView style={styles.card}>
				<ThemedText style={styles.sectionTitle}>Состояние аутентификации</ThemedText>
				<ThemedText style={styles.infoText}>Аутентифицирован: {isAuthenticated ? "Да " : "Нет "}</ThemedText>
				{user && (
					<>
						<ThemedText style={styles.successText}>Пользователь авторизован</ThemedText>
						<ThemedText style={styles.infoText}>Имя: {user.name}</ThemedText>
						<ThemedText style={styles.infoText}>Email: {user.email}</ThemedText>
						<ThemedText style={styles.infoText}>Роль: {user.role}</ThemedText>
					</>
				)}
				{isLoading && (
					<ThemedView style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
						<ActivityIndicator color="#007AFF" />
						<ThemedText style={[styles.infoText, { marginLeft: 10, marginBottom: 0 }]}>Загрузка...</ThemedText>
					</ThemedView>
				)}
				{error && <ThemedText style={styles.errorText}>Ошибка: {error}</ThemedText>}
			</ThemedView>
			{!isAuthenticated ? (
				<ThemedView style={styles.card}>
					<ThemedText style={styles.sectionTitle}>Вход в систему</ThemedText>
					<ThemedText style={styles.label}>Email</ThemedText>
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
					<ThemedText style={styles.label}>Пароль</ThemedText>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholder="admin123"
						placeholderTextColor="#999"
						secureTextEntry
						editable={!isLoading}
					/>
					<ThemedView style={styles.buttonGroup}>
						<Button title={isLoading ? "Вход..." : "Войти"} onPress={handleLogin} disabled={isLoading} />
					</ThemedView>
				</ThemedView>
			) : (
				<ThemedView style={styles.card}>
					<ThemedText style={styles.sectionTitle}>Действия</ThemedText>
					<ThemedView style={styles.buttonGroup}>
						<Button title="Выйти" onPress={handleLogout} color="#FF3B30" />
					</ThemedView>
				</ThemedView>
			)}
			{error && (
				<ThemedView style={styles.card}>
					<ThemedText style={styles.sectionTitle}>Управление ошибками</ThemedText>
					<ThemedView style={styles.buttonGroup}>
						<Button title="Очистить ошибку" onPress={clearError} color="#FF9500" />
					</ThemedView>
				</ThemedView>
			)}
		</ScrollView>

	);

}
