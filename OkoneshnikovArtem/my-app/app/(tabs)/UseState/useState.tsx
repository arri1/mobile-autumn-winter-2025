import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { Button, StyleSheet, Switch, TextInput } from "react-native";
import { styles } from "./style";

export default function TabTwoScreen() {
	// Counter state
	const [count, setCount] = useState(0);

	// Controlled input state
	const [text, setText] = useState("");

	// Toggle state
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<ThemedView style={styles.container}>
			{/* Counter section */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.title}>Counter</ThemedText>
				<ThemedText>Count: {count}</ThemedText>
				<ThemedView style={styles.buttonContainer}>
					<Button title="-" onPress={() => setCount(count - 1)} />
					<Button title="+" onPress={() => setCount(count + 1)} />
				</ThemedView>
			</ThemedView>

			{/* Controlled input section */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.title}>Controlled Input</ThemedText>
				<TextInput
					style={styles.input}
					value={text}
					onChangeText={setText}
					placeholder="Type something..."
				/>
				<ThemedText>You typed: {text}</ThemedText>
			</ThemedView>

			{/* Toggle section */}
			<ThemedView style={styles.section}>
				<ThemedText style={styles.title}>Toggle Switch</ThemedText>
				<Switch
					value={isEnabled}
					onValueChange={() => setIsEnabled((previousState) => !previousState)}
				/>
				<ThemedText>Switch is: {isEnabled ? "ON" : "OFF"}</ThemedText>
			</ThemedView>
		</ThemedView>
	);
}

