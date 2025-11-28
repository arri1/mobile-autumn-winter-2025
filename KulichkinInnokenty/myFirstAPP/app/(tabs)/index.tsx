import { View, Switch } from "react-native";
import { useRouter } from "expo-router";
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
import useAuthStore from "../../store/authStore";
import useThemeStore from "../../store/themeStore";
import { homeStyles as styles } from "./styles";

export default function HomeScreen() {
	const router = useRouter();
	const { isAuthenticated, user } = useAuthStore();
	const { theme, colors, toggleTheme } = useThemeStore();

	return (
		<Container scrollable padding="md">
			<View style={styles.header}>
				<H1 weight="bold" style={styles.pageTitle}>
					Главная
				</H1>
				<Caption color="secondary">
					Минималистичное React Native приложение
				</Caption>
			</View>

			<View style={styles.statusRow}>
				<Caption color="secondary">Аутентификация</Caption>
				<Body weight="semibold">
					{isAuthenticated ? "Авторизован" : "Не авторизован"}
				</Body>
			</View>
			{isAuthenticated && (
				<>
					<View style={styles.divider} />
					<View style={styles.statusRow}>
						<Caption color="secondary">Пользователь</Caption>
						<Body>{user?.email}</Body>
					</View>
				</>
			)}

			{/* Theme Switcher Card */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Тема приложения</H3>
				<View style={styles.statusRow}>
					<View>
						<Body weight="semibold">
							{theme === "dark" ? "Темная" : "Светлая"}
						</Body>
						<Caption color="secondary">
							Переключить на {theme === "dark" ? "светлую" : "темную"}
						</Caption>
					</View>
					<Switch
						value={theme === "light"}
						onValueChange={toggleTheme}
						trackColor={{
							false: colors.switchTrackFalse,
							true: colors.switchTrackTrue,
						}}
						thumbColor={
							theme === "light"
								? colors.switchThumbTrue
								: colors.switchThumbFalse
						}
					/>
				</View>
			</Card>
		</Container>
	);
}
