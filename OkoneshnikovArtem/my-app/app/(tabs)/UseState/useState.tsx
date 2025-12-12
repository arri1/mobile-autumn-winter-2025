import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { Button, Switch, TextInput, Text } from "react-native";
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
