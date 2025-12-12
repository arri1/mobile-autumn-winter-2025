import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useExampleStore } from '@/store/zustandExample';

export default function ZustandResults() {
  const items = useExampleStore((state) => state.items);
  const clearAll = useExampleStore((state) => state.clearAll);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Результаты (Zustand)</Text>

      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Всего: {items.length}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll} disabled={items.length === 0}>
          <Text style={styles.clearButtonText}>Очистить</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Пока нет элементов. Добавьте их на другой вкладке.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 15,
  },
  listContent: {
    gap: 10,
  },
  itemCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  itemText: {
    fontSize: 15,
    color: '#111827',
  },
});

