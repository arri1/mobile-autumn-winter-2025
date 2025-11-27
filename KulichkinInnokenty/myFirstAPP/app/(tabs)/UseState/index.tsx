import { useState, useEffect, useMemo } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView } from "react-native";
import { styles } from './styles';

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
        <Text style={{ marginTop: 8 }}>Длина текста: {textLength} символов</Text>
      </View>
    </ScrollView>
  );
}
