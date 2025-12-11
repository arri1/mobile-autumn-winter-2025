import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
<<<<<<< HEAD:OkoneshnikovArtem/my-app/app/(tabs)/UseState/useState.tsx
import { Button, Switch, TextInput, Text } from "react-native";
import { styles } from "./style";
=======
import { Button, StyleSheet, Switch, TextInput } from "react-native";
>>>>>>> parent of fe4c754 (added UseMemo):OkoneshnikovArtem/my-app/app/(tabs)/useState.tsx

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
        <Text style={styles.title}>Counter</Text>
        <Text style={styles.text}>Count: {count}</Text>
        <ThemedView style={styles.buttonContainer}>
          <Button title="-" onPress={() => setCount(count - 1)} />
          <Button title="+" onPress={() => setCount(count + 1)} />
        </ThemedView>
      </ThemedView>

      {/* Controlled input section */}
      <ThemedView style={styles.section}>
        <Text style={styles.title}>Controlled Input</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type something..."
          placeholderTextColor="#999"
        />
        <Text style={styles.text}>You typed: {text}</Text>
      </ThemedView>

<<<<<<< HEAD:OkoneshnikovArtem/my-app/app/(tabs)/UseState/useState.tsx
      {/* Toggle section */}
      <ThemedView style={styles.section}>
        <Text style={styles.title}>Toggle Switch</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled((previousState) => !previousState)}
        />
        <Text style={styles.text}>Switch is: {isEnabled ? "ON" : "OFF"}</Text>
      </ThemedView>
    </ThemedView>
  );
}
=======
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	section: {
		padding: 16,
		borderRadius: 8,
		gap: 10,
		backgroundColor: "#232224ff",
		width: "30vh",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		backgroundColor: "none",
		gap: 10,
	},
	input: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		borderColor: "#ffffff",
		color: "#ffffff",
	},
});
>>>>>>> parent of fe4c754 (added UseMemo):OkoneshnikovArtem/my-app/app/(tabs)/useState.tsx
