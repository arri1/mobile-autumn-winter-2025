import { View } from "react-native";
import {
	Container,
	Card,
	H1,
	H2,
	H3,
	Body,
	Caption,
} from "../../components/ui";
import { exploreStyles as styles } from "./styles";

export default function ExploreScreen() {
	return (
		<Container scrollable padding="md">
			<View style={styles.header}>
				<H1>Обзор</H1>
				<Caption color="secondary">Технологии и компоненты приложения</Caption>
			</View>

			{/* Tech Stack Card */}
			<Card variant="outlined">
				<H2 style={styles.cardTitle}>Стек технологий</H2>
				<View style={styles.techList}>
					<View style={styles.techItem}>
						<H3 style={styles.techName}>React Native</H3>
						<Body color="secondary">Кроссплатформенная разработка</Body>
					</View>
					<View style={styles.divider} />
					<View style={styles.techItem}>
						<H3 style={styles.techName}>Expo Router</H3>
						<Body color="secondary">Файловая маршрутизация</Body>
					</View>
					<View style={styles.divider} />
					<View style={styles.techItem}>
						<H3 style={styles.techName}>Zustand</H3>
						<Body color="secondary">Управление состоянием</Body>
					</View>
					<View style={styles.divider} />
					<View style={styles.techItem}>
						<H3 style={styles.techName}>TypeScript</H3>
						<Body color="secondary">Типизированный JavaScript</Body>
					</View>
				</View>
			</Card>

			{/* UI Components Card */}
			<Card variant="outlined">
				<H2 style={styles.cardTitle}>UI Компоненты</H2>
				<Body color="secondary" style={styles.description}>
					Минималистичная система компонентов с черно-белой палитрой
				</Body>
				<View style={styles.componentList}>
					<View style={styles.componentItem}>
						<Caption color="secondary">Typography</Caption>
						<Body weight="medium">H1, H2, H3, Body, Caption</Body>
					</View>
					<View style={styles.componentItem}>
						<Caption color="secondary">Inputs</Caption>
						<Body weight="medium">TextInput с валидацией</Body>
					</View>
					<View style={styles.componentItem}>
						<Caption color="secondary">Buttons</Caption>
						<Body weight="medium">Primary, Outline, Ghost</Body>
					</View>
					<View style={styles.componentItem}>
						<Caption color="secondary">Cards</Caption>
						<Body weight="medium">Default, Outlined, Elevated</Body>
					</View>
				</View>
			</Card>

			{/* Design Principles Card */}
			<Card variant="outlined">
				<H2 style={styles.cardTitle}>Принципы дизайна</H2>
				<View style={styles.principlesList}>
					<View style={styles.principleItem}>
						<View style={styles.numberBadge}>
							<Caption weight="bold">01</Caption>
						</View>
						<View style={styles.principleContent}>
							<H3 style={styles.principleName}>Минимализм</H3>
							<Body color="secondary">
								Только необходимые элементы, без лишних украшений
							</Body>
						</View>
					</View>

					<View style={styles.principleItem}>
						<View style={styles.numberBadge}>
							<Caption weight="bold">02</Caption>
						</View>
						<View style={styles.principleContent}>
							<H3 style={styles.principleName}>Иерархия</H3>
							<Body color="secondary">
								Четкая визуальная структура через размеры и веса шрифтов
							</Body>
						</View>
					</View>

					<View style={styles.principleItem}>
						<View style={styles.numberBadge}>
							<Caption weight="bold">03</Caption>
						</View>
						<View style={styles.principleContent}>
							<H3 style={styles.principleName}>Читаемость</H3>
							<Body color="secondary">
								Оптимальные размеры шрифтов и межстрочные интервалы
							</Body>
						</View>
					</View>

					<View style={styles.principleItem}>
						<View style={styles.numberBadge}>
							<Caption weight="bold">04</Caption>
						</View>
						<View style={styles.principleContent}>
							<H3 style={styles.principleName}>Контраст</H3>
							<Body color="secondary">
								Монохромная палитра с акцентом на контрасте
							</Body>
						</View>
					</View>
				</View>
			</Card>

			{/* Color Palette Card */}
			<Card variant="outlined">
				<H2 style={styles.cardTitle}>Цветовая палитра</H2>
				<View style={styles.colorGrid}>
					<View style={styles.colorRow}>
						<View style={[styles.colorBox, { backgroundColor: "#000000" }]} />
						<View style={styles.colorInfo}>
							<Body weight="semibold">#000000</Body>
							<Caption color="secondary">Primary / Text</Caption>
						</View>
					</View>
					<View style={styles.colorRow}>
						<View
							style={[
								styles.colorBox,
								{
									backgroundColor: "#525252",
									borderWidth: 1,
									borderColor: "#E5E5E5",
								},
							]}
						/>
						<View style={styles.colorInfo}>
							<Body weight="semibold">#525252</Body>
							<Caption color="secondary">Secondary Text</Caption>
						</View>
					</View>
					<View style={styles.colorRow}>
						<View
							style={[
								styles.colorBox,
								{
									backgroundColor: "#A3A3A3",
									borderWidth: 1,
									borderColor: "#E5E5E5",
								},
							]}
						/>
						<View style={styles.colorInfo}>
							<Body weight="semibold">#A3A3A3</Body>
							<Caption color="secondary">Tertiary Text</Caption>
						</View>
					</View>
					<View style={styles.colorRow}>
						<View
							style={[
								styles.colorBox,
								{
									backgroundColor: "#E5E5E5",
									borderWidth: 1,
									borderColor: "#D4D4D4",
								},
							]}
						/>
						<View style={styles.colorInfo}>
							<Body weight="semibold">#E5E5E5</Body>
							<Caption color="secondary">Borders</Caption>
						</View>
					</View>
					<View style={styles.colorRow}>
						<View
							style={[
								styles.colorBox,
								{
									backgroundColor: "#FAFAFA",
									borderWidth: 1,
									borderColor: "#E5E5E5",
								},
							]}
						/>
						<View style={styles.colorInfo}>
							<Body weight="semibold">#FAFAFA</Body>
							<Caption color="secondary">Background</Caption>
						</View>
					</View>
				</View>
			</Card>
		</Container>
	);
}
