import { useState, useEffect } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView, StyleSheet } from "react-native";

export default function UseEffectLab() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(false);

  // локальный стейт для отображения сообщений из useEffect
  const [effectMessage, setEffectMessage] = useState("");

  //useEffect
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Отображаем сообщение из useEffect */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Последнее событие (useEffect)</Text>
        <Text style={{ fontSize: 16, color: "#007AFF" }}>{effectMessage}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Счётчик</Text>
        <Text style={styles.counterText}>Счёт: {count}</Text>
        <View style={styles.buttonGroup}>
          <Button title="Добавить" onPress={() => setCount(count + 1)} />
          <Button title="Сброс" onPress={() => setCount(0)} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Переключатель</Text>
        <Text style={styles.switchLabel}>{enabled ? "Включено" : "Выключено"}</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Текстовое поле</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.previewText}>Вы ввели: {text || "ничего"}</Text>
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
