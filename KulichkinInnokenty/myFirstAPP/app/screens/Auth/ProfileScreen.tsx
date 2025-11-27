import React from "react";
import { View, Text, Button, ScrollView, Alert, ActivityIndicator } from "react-native";
import useAuthStore from "../../../store/authStore";
import { styles } from "./styles";

export default function ProfileScreen() {
	const { user, logout, isLoading } = useAuthStore();

	const handleLogout = async () => {
		Alert.alert("Выход", "Вы уверены, что хотите выйти?", [
			{
				text: "Отмена",
				style: "cancel",
			},
			{
				text: "Выйти",
				style: "destructive",
				onPress: async () => {
					try {
						await logout();
						Alert.alert("Информация", "Вы вышли из системы");
					} catch (error) {
						Alert.alert("Ошибка", "Не удалось выйти");
					}
				},
			},
		]);
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#007AFF" />
				<Text style={styles.loadingText}>Загрузка...</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Профиль</Text>
				<Text style={styles.subtitle}>Информация о пользователе</Text>
			</View>

			{/* Карточка с информацией о пользователе */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Данные пользователя</Text>

				<View style={styles.infoRow}>
					<Text style={styles.label}>Имя:</Text>
					<Text style={styles.value}>{user?.name || "N/A"}</Text>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.label}>Email:</Text>
					<Text style={styles.value}>{user?.email || "N/A"}</Text>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.label}>Роль:</Text>
					<Text style={[styles.value, styles.roleText]}>{user?.role || "N/A"}</Text>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.label}>ID:</Text>
					<Text style={styles.value}>{user?.id || "N/A"}</Text>
				</View>
			</View>

			{/* Карточка с действиями */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Действия</Text>

				<View style={styles.buttonGroup}>
					<Button title="Выйти из аккаунта" onPress={handleLogout} color="#FF3B30" disabled={isLoading} />
				</View>
			</View>

			{/* Информационная карточка */}
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>О приложении</Text>
				<Text style={styles.infoText}>Это демонстрационное приложение с аутентификацией через API.</Text>
				<Text style={styles.infoText}>{"\n"}Используется:</Text>
				<Text style={styles.infoText}>• Zustand для управления состоянием</Text>
				<Text style={styles.infoText}>• Axios для HTTP запросов</Text>
				<Text style={styles.infoText}>• AsyncStorage для хранения токенов</Text>
				<Text style={styles.infoText}>• JWT токены для аутентификации</Text>
			</View>
		</ScrollView>
	);
}
