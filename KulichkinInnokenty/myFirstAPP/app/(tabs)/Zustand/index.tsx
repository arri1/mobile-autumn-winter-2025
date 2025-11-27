import React, { useState } from "react";
import { View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../../../store/authStore";
import { Container, Card, Button, Input, H2, H3, Body, Caption } from "../../../components/ui";

export default function ZustandLab() {
	const router = useRouter();

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
		<Container scrollable padding="md">
			<H2 style={styles.pageTitle}>Zustand Authentication</H2>
			<Caption color="secondary" style={styles.pageSubtitle}>
				Управление состоянием с минималистичным дизайном
			</Caption>

			{/* Карточка состояния аутентификации */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Состояние</H3>

				<View style={styles.statusRow}>
					<Body color="secondary">Статус:</Body>
					<Body weight="semibold" style={styles.statusValue}>
						{isAuthenticated ? "Авторизован" : "Не авторизован"}
					</Body>
				</View>

				{user && (
					<View style={styles.userInfo}>
						<View style={styles.infoRow}>
							<Caption color="secondary">Имя</Caption>
							<Body>{user.name}</Body>
						</View>
						<View style={styles.infoRow}>
							<Caption color="secondary">Email</Caption>
							<Body>{user.email}</Body>
						</View>
						<View style={styles.infoRow}>
							<Caption color="secondary">Роль</Caption>
							<Body weight="medium">{user.role}</Body>
						</View>
					</View>
				)}

				{isLoading && (
					<View style={styles.loadingRow}>
						<ActivityIndicator color="#000000" size="small" />
						<Caption color="secondary" style={styles.loadingText}>
							Загрузка...
						</Caption>
					</View>
				)}

				{error && (
					<View style={styles.errorContainer}>
						<Body weight="medium">Ошибка: {error}</Body>
					</View>
				)}
			</Card>

			{/* Карточка с формой входа или действиями */}
			{!isAuthenticated ? (
				<Card variant="outlined">
					<H3 style={styles.cardTitle}>Вход</H3>

					<Input
						label="Email"
						value={email}
						onChangeText={setEmail}
						placeholder="admin@example.com"
						keyboardType="email-address"
						autoCapitalize="none"
						editable={!isLoading}
					/>

					<Input
						label="Пароль"
						value={password}
						onChangeText={setPassword}
						placeholder="admin123"
						secureTextEntry
						editable={!isLoading}
					/>

					<Button
						title={isLoading ? "Вход..." : "Войти"}
						onPress={handleLogin}
						disabled={isLoading}
						loading={isLoading}
						variant="primary"
						size="lg"
					/>
				</Card>
			) : (
				<Card variant="outlined">
					<H3 style={styles.cardTitle}>Действия</H3>
					<Button
						title="Выйти"
						onPress={handleLogout}
						variant="outline"
						size="lg"
					/>
				</Card>
			)}

			{/* Карточка с навигацией */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Навигация</H3>

				{!isAuthenticated ? (
					<View style={styles.buttonStack}>
						<Button
							title="Экран входа"
							onPress={() => router.push("/auth/login")}
							variant="outline"
							size="md"
						/>
						<Button
							title="Регистрация"
							onPress={() => router.push("/auth/register")}
							variant="ghost"
							size="md"
						/>
					</View>
				) : (
					<Button
						title="Перейти в профиль"
						onPress={() => router.push("/auth/profile")}
						variant="outline"
						size="md"
					/>
				)}
			</Card>

			{/* Карточка с очисткой ошибки */}
			{error && (
				<Card variant="outlined">
					<H3 style={styles.cardTitle}>Управление ошибками</H3>
					<Button
						title="Очистить ошибку"
						onPress={clearError}
						variant="ghost"
						size="md"
					/>
				</Card>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	pageTitle: {
		marginTop: 8,
		marginBottom: 4,
	},
	pageSubtitle: {
		marginBottom: 24,
	},
	cardTitle: {
		marginBottom: 16,
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 16,
	},
	statusValue: {
		marginLeft: 8,
	},
	userInfo: {
		gap: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#E5E5E5',
	},
	infoRow: {
		gap: 4,
	},
	loadingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#E5E5E5',
	},
	loadingText: {
		marginBottom: 0,
	},
	errorContainer: {
		marginTop: 12,
		padding: 12,
		backgroundColor: '#FAFAFA',
		borderRadius: 4,
		borderLeftWidth: 2,
		borderLeftColor: '#000000',
	},
	buttonStack: {
		gap: 12,
	},
});
