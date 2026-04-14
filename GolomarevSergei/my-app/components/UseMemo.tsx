import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function slowFactorial(n: number) {
  let result = 1;
  for (let i = 1; i <= n; i += 1) {
    // имитация сложной операции
    for (let j = 0; j < 1000000; j += 1) {
      result += 0;
    }
    result *= i;
  }
  return result;
}

export default function UseMemo() {
  const [count, setCount] = useState(5);
  const [text, setText] = useState('memo');
  const [search, setSearch] = useState('');
  const [items] = useState(['apple', 'banana', 'orange', 'grape', 'lemon', 'melon']);

  const factorial = useMemo(() => slowFactorial(count), [count]);
  const upperText = useMemo(() => text.toUpperCase(), [text]);
  const filteredItems = useMemo(
    () => items.filter((item) => item.includes(search.toLowerCase())),
    [items, search]
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Примеры useMemo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Мемоизация сложного вычисления</Text>
        <Text style={styles.description}>useMemo сохраняет результат, пока count не изменится</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallButton} onPress={() => setCount((prev) => Math.max(1, prev - 1))}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.countText}>{count}</Text>

          <TouchableOpacity style={styles.smallButton} onPress={() => setCount((prev) => prev + 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Факториал:</Text>
          <Text style={styles.valueText}>{factorial}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Мемоизация строки</Text>
        <Text style={styles.description}>useMemo возвращает uppercase-версию текста</Text>

        <TextInput
          style={styles.input}
          placeholder="Введите текст"
          value={text}
          onChangeText={setText}
          placeholderTextColor="#999"
        />

        <View style={styles.valueBox}>
          <Text style={styles.valueLabel}>Результат:</Text>
          <Text style={styles.valueText}>{upperText}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Мемоизация фильтрации списка</Text>
        <Text style={styles.description}>useMemo сохраняет отфильтрированный массив</Text>

        <TextInput
          style={styles.input}
          placeholder="Поиск..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />

        <View style={styles.listBox}>
          {filteredItems.length === 0 ? (
            <Text style={styles.emptyText}>Нет совпадений</Text>
          ) : (
            filteredItems.map((item) => (
              <Text key={item} style={styles.listItem}>
                • {item}
              </Text>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fc',
    padding: 16,
  },
  title: {
    fontSize: 26,
    color: '#1f2937',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  smallButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  countText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  valueBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    padding: 14,
  },
  valueLabel: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 6,
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
    marginBottom: 14,
    backgroundColor: '#f9fafb',
  },
  listBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f8fafc',
  },
  listItem: {
    fontSize: 15,
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});