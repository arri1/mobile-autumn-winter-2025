import { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView, StyleSheet } from "react-native";

export default function UseStateLab() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(false);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>UseEffect</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Счётчик</Text>
        <Text style={styles.counterText}>Счёт: {count}</Text>
        <Text style={{ color: isEven ? "green" : "red" }}>
          {isEven ? "Чётное" : "Нечётное"}
        </Text>
        <View style={styles.buttonGroup}>
          <Button title="Добавить" onPress={() => setCount(count + 1)} />
          <Button title="Сброс" onPress={() => setCount(0)} />
        </View>
      </View>

      <Text>UseState</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Переключатель</Text>
        <Text style={styles.switchLabel}>{enabled ? "Включено" : "Выключено"}</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      <Text>UseMemo</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Текстовое поле</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.previewText}>Вы ввели: {text || "ничего"}</Text>
        <Text style={{ marginTop: 8 }}>Длина текста: {textLength} символов</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  counterText: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonGroup: {
    gap: 10,
    flexDirection: "row",
  },
  switchLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
  },
  previewText: {
    fontSize: 16,
    color: "#444",
  },
});
