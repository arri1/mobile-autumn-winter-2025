import React from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/authStore";
import {
	Container,
	Card,
	Button,
	H1,
	H2,
	H3,
	Body,
	Caption,
} from "../../components/ui";
import { authStyles as styles } from "./styles";

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
			<Container padding="md">
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#000000" />
					<Caption color="secondary" style={styles.loadingText}>
						Загрузка...
					</Caption>
				</View>
			</Container>
		);
	}

	return (
		<Container scrollable padding="md">
			<View style={styles.header}>
				<H1>Профиль</H1>
				<Caption color="secondary">Информация о пользователе</Caption>
			</View>

			{/* Карточка с информацией о пользователе */}
			<Card variant="outlined">
				<H2 style={styles.cardTitle}>Данные пользователя</H2>

				<View style={styles.infoSection}>
					<View style={styles.infoRow}>
						<Caption color="secondary">Имя</Caption>
						<Body weight="semibold">{user?.name || "N/A"}</Body>
					</View>

					<View style={styles.divider} />

					<View style={styles.infoRow}>
						<Caption color="secondary">Email</Caption>
						<Body weight="semibold">{user?.email || "N/A"}</Body>
					</View>

					<View style={styles.divider} />

					<View style={styles.infoRow}>
						<Caption color="secondary">Роль</Caption>
						<View style={styles.roleBadge}>
							<Caption weight="semibold">{user?.role || "N/A"}</Caption>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.infoRow}>
						<Caption color="secondary">ID</Caption>
						<Caption color="tertiary">{user?.id || "N/A"}</Caption>
					</View>
				</View>
			</Card>

			{/* Карточка с действиями */}
			<Card variant="outlined">
				<Button
					title="Выйти из аккаунта"
					onPress={handleLogout}
					disabled={isLoading}
					variant="outline"
					size="lg"
				/>
			</Card>
		</Container>
	);
}
