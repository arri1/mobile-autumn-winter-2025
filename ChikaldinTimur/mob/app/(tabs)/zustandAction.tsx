import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useExampleStore } from '@/store/zustandExample';

export default function ZustandAction() {
  const [text, setText] = useState('');
  const addItem = useExampleStore((state) => state.addItem);
  const count = useExampleStore((state) => state.items.length);

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addItem(trimmed);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Добавление записей (Zustand)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Текст записи</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Введите что-нибудь..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
        <Text style={styles.helper}>Добавлено элементов: {count}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  helper: {
    fontSize: 14,
    color: '#4b5563',
  },
});

