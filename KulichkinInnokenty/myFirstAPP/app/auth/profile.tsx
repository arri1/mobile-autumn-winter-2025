import React from "react";
import { View, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/authStore";
import { Container, Card, Button, H1, H2, H3, Body, Caption } from "../../components/ui";

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
				<H3 style={styles.cardTitle}>Действия</H3>

				<Button
					title="Выйти из аккаунта"
					onPress={handleLogout}
					disabled={isLoading}
					variant="outline"
					size="lg"
				/>
			</Card>

			{/* Информационная карточка */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>О приложении</H3>

				<Body color="secondary" style={styles.aboutText}>
					Это демонстрационное приложение с аутентификацией через API.
				</Body>

				<View style={styles.techStack}>
					<Caption weight="semibold" style={styles.techTitle}>
						Технологии:
					</Caption>
					<View style={styles.techList}>
						<Caption color="secondary">• Zustand для управления состоянием</Caption>
						<Caption color="secondary">• Axios для HTTP запросов</Caption>
						<Caption color="secondary">• AsyncStorage для хранения токенов</Caption>
						<Caption color="secondary">• JWT токены для аутентификации</Caption>
						<Caption color="secondary">• Минималистичный черно-белый дизайн</Caption>
					</View>
				</View>
			</Card>
		</Container>
	);
}

const styles = StyleSheet.create({
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	cardTitle: {
		marginBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
	loadingText: {
		marginBottom: 0,
	},
	infoSection: {
		gap: 0,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
	},
	divider: {
		height: 1,
		backgroundColor: '#E5E5E5',
	},
	roleBadge: {
		backgroundColor: '#F5F5F5',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#E5E5E5',
	},
	aboutText: {
		marginBottom: 20,
	},
	techStack: {
		gap: 12,
	},
	techTitle: {
		marginBottom: 0,
	},
	techList: {
		gap: 6,
	},
});
