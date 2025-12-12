import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AuthGuard } from '@/components/auth-guard';

export default function UseMemoLab() {
  const [filter, setFilter] = useState('');

  const items = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango', 'pear'];

  const filteredItems = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(filter.toLowerCase())),
    [items, filter],
  );

  return (
    <AuthGuard>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Пример useMemo</Text>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Фильтрация списка с useMemo</Text>
        <TextInput
          style={styles.input}
          value={filter}
          onChangeText={setFilter}
          placeholder="Фильтр по фрутам..."
        />
        <Text style={styles.text}>Результаты:</Text>
        {filteredItems.map((item) => (
          <Text style={styles.listItem} key={item}>
            • {item}
          </Text>
        ))}
        <Text style={styles.helper}>
          Отфильтрованный список пересчитывается только при изменении строки фильтра.
        </Text>
      </View>
    </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  block: {
    marginBottom: 32,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  helper: {
    fontSize: 13,
    color: '#555',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});


