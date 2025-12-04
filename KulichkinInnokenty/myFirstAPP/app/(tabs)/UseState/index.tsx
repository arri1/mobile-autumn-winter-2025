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

export default function UseStateLab() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("");
	const [enabled, setEnabled] = useState(false);
	const [items, setItems] = useState<string[]>([]);
	const [newItem, setNewItem] = useState("");

	// --- useEffect ---
	useEffect(() => {
		console.log("Счётчик изменился:", count);
	}, [count]);

	useEffect(() => {
		console.log("Переключатель изменился:", enabled ? "Включено" : "Выключено");
	}, [enabled]);

	useEffect(() => {
		console.log("Текст изменился:", text);
	}, [text]);

	// --- useMemo ---
	const isEven = useMemo(() => {
		console.log("Пересчитываем isEven...");
		return count % 2 === 0;
	}, [count]);

	const textLength = useMemo(() => {
		console.log("Пересчитываем textLength...");
		return text.length;
	}, [text]);

	// Handlers
	const addItem = () => {
		if (newItem.trim()) {
			setItems([...items, newItem.trim()]);
			setNewItem("");
		}
	};

	const removeItem = (index: number) => {
		setItems(items.filter((_, i) => i !== index));
	};

	const clearItems = () => {
		setItems([]);
	};

	return (
		<Container scrollable padding="md">
			<H1 weight="bold" style={styles.pageTitle}>
				useState Hook
			</H1>
			<Caption color="secondary" style={styles.pageSubtitle}>
				Управление состоянием компонента
			</Caption>

			{/* Счётчик */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Счётчик (Number)</H3>

				<View style={styles.counterDisplay}>
					<Caption color="secondary">Текущее значение</Caption>
					<H2>{count}</H2>
					<Caption color={isEven ? "secondary" : "tertiary"}>
						{isEven ? "Чётное число" : "Нечётное число"}
					</Caption>
				</View>

				<View style={styles.buttonStack}>
					<View style={styles.buttonRow}>
						<View style={styles.buttonThird}>
							<Button
								title="-1"
								onPress={() => setCount(count - 1)}
								variant="outline"
								size="sm"
							/>
						</View>
						<View style={styles.buttonThird}>
							<Button
								title="Сброс"
								onPress={() => setCount(0)}
								variant="ghost"
								size="sm"
							/>
						</View>
						<View style={styles.buttonThird}>
							<Button
								title="+1"
								onPress={() => setCount(count + 1)}
								variant="primary"
								size="sm"
							/>
						</View>
					</View>
					<Button
						title="+10"
						onPress={() => setCount(count + 10)}
						variant="outline"
						size="md"
					/>
				</View>
			</Card>

			{/* Переключатель */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Переключатель (Boolean)</H3>

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

				<View style={styles.switchInfo}>
					<Caption color="tertiary">
						useState возвращает: [{enabled ? "true" : "false"}, setEnabled]
					</Caption>
				</View>
			</Card>

			{/* Текстовое поле */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Текстовое поле (String)</H3>

				<Input
					placeholder="Введите текст..."
					value={text}
					onChangeText={setText}
				/>

				<View style={styles.textInfo}>
					<View style={styles.infoRow}>
						<Caption color="secondary">Введено символов:</Caption>
						<Body weight="semibold">{textLength}</Body>
					</View>
					<View style={styles.infoRow}>
						<Caption color="secondary">Значение:</Caption>
						<Body>{text || "пусто"}</Body>
					</View>
				</View>

				{text && (
					<Button
						title="Очистить"
						onPress={() => setText("")}
						variant="ghost"
						size="sm"
					/>
				)}
			</Card>

			{/* Список (Array) */}
			<Card variant="outlined">
				<H3 style={styles.cardTitle}>Список (Array)</H3>

				<View style={styles.listInput}>
					<View style={styles.inputWrapper}>
						<Input
							placeholder="Новый элемент..."
							value={newItem}
							onChangeText={setNewItem}
							containerStyle={styles.inputContainer}
						/>
					</View>
					<Button
						title="Добавить"
						onPress={addItem}
						variant="primary"
						size="md"
						disabled={!newItem.trim()}
					/>
				</View>

				{items.length > 0 ? (
					<>
						<View style={styles.itemsList}>
							{items.map((item, index) => (
								<View key={index} style={styles.listItem}>
									<Body style={styles.itemText}>{item}</Body>
									<Button
										title="×"
										onPress={() => removeItem(index)}
										variant="ghost"
										size="sm"
									/>
								</View>
							))}
						</View>

						<View style={styles.listFooter}>
							<Caption color="secondary">
								Всего элементов: {items.length}
							</Caption>
							<Button
								title="Очистить всё"
								onPress={clearItems}
								variant="outline"
								size="sm"
							/>
						</View>
					</>
				) : (
					<View style={styles.emptyState}>
						<Caption color="tertiary">Список пуст</Caption>
					</View>
				)}
			</Card>

			{/* Информация */}
			{/* <Card variant="outlined">
				<H3 style={styles.cardTitle}>О useState</H3>

				<View style={styles.infoList}>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Хранит локальное состояние компонента</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">
							Возвращает массив: [значение, функция обновления]
						</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Вызывает ре-рендер при изменении</Body>
					</View>
					<View style={styles.infoItem}>
						<View style={styles.infoBullet} />
						<Body color="secondary">Работает с любыми типами данных</Body>
					</View>
				</View>
			</Card> */}
		</Container>
	);
}
