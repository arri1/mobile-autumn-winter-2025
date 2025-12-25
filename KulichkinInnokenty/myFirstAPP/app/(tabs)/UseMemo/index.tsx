import { useState, useEffect, useMemo } from "react";
import { View, Switch } from "react-native";
import {
	Container,
	Card,
	Button,
	Input,
	H1,
	H2,
	H3,
	Body,
	Caption,
} from "../../../components/ui";
import { styles } from "./styles";

export default function UseMemoLab() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("");
	const [enabled, setEnabled] = useState(false);

	// ===================== useEffect =====================
	const [effectMessage, setEffectMessage] = useState("");

	useEffect(() => {
		const msg = `Счётчик изменился: ${count}`;
		console.log(msg);
		setEffectMessage(msg);
	}, [count]);

	useEffect(() => {
		const msg = `Переключатель: ${enabled ? "Включено" : "Выключено"}`;
		console.log(msg);
		setEffectMessage(msg);
	}, [enabled]);

	useEffect(() => {
		const msg = `Текст изменился: ${text || "ничего"}`;
		console.log(msg);
		setEffectMessage(msg);
	}, [text]);
	// =====================================================

	// ===================== useMemo =====================
	const isEven = useMemo(() => {
		console.log("Пересчитываем isEven...");
		return count % 2 === 0;
	}, [count]);

	const textLength = useMemo(() => {
		console.log("Пересчитываем textLength...");
		return text.length;
	}, [text]);

	const textStats = useMemo(() => {
		console.log("Пересчитываем статистику текста...");
		return {
			words: text.trim() ? text.trim().split(/\s+/).length : 0,
			chars: text.length,
			charsNoSpaces: text.replace(/\s/g, "").length,
		};
	}, [text]);
	// =====================================================

	return (
		<Container scrollable padding="md" style={{marginTop: 34}}>
			<H1 weight="bold" style={styles.pageTitle}>
				useMemo Hook
			</H1>
			<Caption color="secondary" style={styles.pageSubtitle}>
				Мемоизация вычислений для оптимизации производительности
			</Caption>

			{/* useEffect: последнее событие */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Последнее событие</H3>
				<View style={styles.eventContainer}>
					<Body weight="medium">{effectMessage || "Нет событий"}</Body>
					<Caption style={styles.eventHint}>
						Отслеживается через useEffect
					</Caption>
				</View>
			</Card>

			{/* Счётчик с useMemo */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Счётчик с мемоизацией</H3>

				<View style={styles.counterDisplay}>
					<Caption color="secondary">Текущее значение</Caption>
					<H2>{count}</H2>
				</View>

				<View style={styles.memoResult}>
					<View style={styles.memoRow}>
						<Caption color="secondary">Чётность (useMemo)</Caption>
						<Body weight="semibold">{isEven ? "Чётное" : "Нечётное"}</Body>
					</View>
				</View>

				<View style={styles.buttonStack}>
					<Button
						title="Увеличить"
						onPress={() => setCount(count + 1)}
						variant="primary"
						size="md"
					/>
					<Button
						title="Сброс"
						onPress={() => setCount(0)}
						variant="outline"
						size="md"
					/>
				</View>
			</Card>

			{/* Переключатель */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Переключатель</H3>

				<View style={styles.switchRow}>
					<View>
						<Body weight="semibold">{enabled ? "Включено" : "Выключено"}</Body>
						<Caption color="secondary">Состояние переключателя</Caption>
					</View>
					<Switch
						value={enabled}
						onValueChange={setEnabled}
						trackColor={{ false: "#E5E5E5", true: "#525252" }}
						thumbColor={enabled ? "#000000" : "#A3A3A3"}
					/>
				</View>
			</Card>

			{/* Текстовое поле с useMemo статистикой */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Анализ текста (useMemo)</H3>

				<Input
					placeholder="Введите текст..."
					value={text}
					onChangeText={setText}
				/>

				<View style={styles.textPreview}>
					<Caption color="secondary">Введённый текст:</Caption>
					<Body>{text || "ничего"}</Body>
				</View>

				<View style={styles.statsContainer}>
					<Caption weight="semibold" style={styles.statsTitle}>
						Статистика (мемоизированная):
					</Caption>

					<View style={styles.statsGrid}>
						<View style={styles.statItem}>
							<Caption color="secondary">Символов</Caption>
							<H3 style={styles.statValue}>{textStats.chars}</H3>
						</View>

						<View style={styles.statItem}>
							<Caption color="secondary">Без пробелов</Caption>
							<H3 style={styles.statValue}>{textStats.charsNoSpaces}</H3>
						</View>

						<View style={styles.statItem}>
							<Caption color="secondary">Слов</Caption>
							<H3 style={styles.statValue}>{textStats.words}</H3>
						</View>
					</View>

					<Caption color="tertiary" style={styles.statsHint}>
						Вычисления выполняются только при изменении текста
					</Caption>
				</View>
			</Card>

			{/* Информация о useMemo */}
			{/* <Card variant="outlined">
				<H3 style={styles.cardTitle}>Зачем useMemo?</H3>

				<View style={styles.infoList}>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Мемоизирует результат вычислений</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">
							Пересчитывает только при изменении зависимостей
						</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Оптимизирует производительность</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Проверяйте консоль для логов</Body>
					</View>
				</View>
			</Card> */}
		</Container>
	);
}
