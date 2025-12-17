import React from "react";
import { Alert, ActivityIndicator, Button } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "@/store/authStore";
import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
export default function ProfileScreen() {
	const router = useRouter();
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
						router.replace("/(tabs)");
					} catch (error) {
						Alert.alert("Ошибка", "Не удалось выйти");
					}
				},
			},
		]);
	};

	if (isLoading) {
		return (
			<ThemedView style={styles.container}>
				<ThemedView style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#000000" />
					<ThemedText style={styles.loadingText}>
						Загрузка...
					</ThemedText>
				</ThemedView>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedText style={styles.mainTitle}>Профиль</ThemedText>
				<ThemedText style={styles.cardTitle}>Информация о пользователе</ThemedText>
			</ThemedView>

			<ThemedView style={styles.card}>
				<ThemedText style={styles.cardTitle}>Данные пользователя</ThemedText>

				<ThemedView style={styles.infoSection}>
					<ThemedView style={styles.infoRow}>
						<ThemedText>Имя</ThemedText>
						<ThemedText>{user?.name || "N/A"}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.divider} />

					<ThemedView style={styles.infoRow}>
						<ThemedText>Email</ThemedText>
						<ThemedText>{user?.email || "N/A"}</ThemedText>
					</ThemedView>

					<ThemedView style={styles.divider} />

					<ThemedView style={styles.infoRow}>
						<ThemedText>Роль    </ThemedText>
						<ThemedView style={styles.roleBadge}>
							<ThemedText>{user?.role || "N/A"}</ThemedText>
						</ThemedView>
					</ThemedView>

					<ThemedView style={styles.divider} />

					<ThemedView style={styles.infoRow}>
						<ThemedText>ID</ThemedText>
						<ThemedText>{user?.id || "N/A"}</ThemedText>
					</ThemedView>
				</ThemedView>
			</ThemedView>

			{/* Карточка с действиями */}
			<ThemedView style={styles.card}>
				<Button
					title="Выйти из аккаунта"
					onPress={handleLogout}
					disabled={isLoading}
				/>
			</ThemedView>
		</ThemedView>
	);
}