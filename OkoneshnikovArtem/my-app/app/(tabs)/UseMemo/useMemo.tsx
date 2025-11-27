import { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView } from "react-native";
import { styles } from './styles';

export default function UseMemoLab() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
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
  // =====================================================


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* useEffect: показываем последнее событие */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Последнее событие (useEffect)</Text>
        <Text style={{ fontSize: 16, color: "#007AFF" }}>{effectMessage}</Text>
      </View>

      {/* Счётчик */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Счётчик</Text>
        <Text style={styles.counterText}>Счёт: {count}</Text>
        {/* useMemo для чётности */}
        <Text style={{ color: isEven ? "green" : "red" }}>
          {isEven ? "Чётное (useMemo)" : "Нечётное (useMemo)"}
        </Text>
        <View style={styles.buttonGroup}>
          <Button title="Добавить" onPress={() => setCount(count + 1)} />
          <Button title="Сброс" onPress={() => setCount(0)} />
        </View>
      </View>

      {/* Переключатель */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Переключатель</Text>
        <Text style={styles.switchLabel}>{enabled ? "Включено" : "Выключено"}</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      {/* Текстовое поле */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Текстовое поле</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.previewText}>Вы ввели: {text || "ничего"}</Text>
        {/* useMemo для длины текста */}
        <Text style={{ marginTop: 8, color: "#8e44ad" }}>
          Длина текста (useMemo): {textLength} символов
        </Text>
      </View>
    </ScrollView>
  );
}
