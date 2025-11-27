import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

const UseMemoScreen = () => {
  const [input, setInput] = useState('1,2,3');

  const subsets = useMemo(() => {
    const items = input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!items.length) {
      return [[]];
    }

    const buildSubsets = (arr: string[]): string[][] => {
      if (!arr.length) {
        return [[]];
      }

      const [first, ...rest] = arr;
      const subsetsWithoutFirst = buildSubsets(rest);
      const subsetsWithFirst = subsetsWithoutFirst.map((subset) => [
        first,
        ...subset,
      ]);

      return [...subsetsWithoutFirst, ...subsetsWithFirst];
    };

    return buildSubsets(items).sort((a, b) => a.length - b.length);
  }, [input]);

  const elementsCount = useMemo(
    () =>
      input
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean).length,
    [input],
  );

  const renderSubset = ({ item, index }: { item: string[]; index: number }) => (
    <View style={styles.subsetItem}>
      <Text style={styles.subsetIndex}>{index + 1}.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subsetScroll}
      >
        <Text style={styles.subsetText}>
          {item.length ? `{${item.join(', ')}}` : '∅'}
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UseMemo</Text>


      <View style={styles.card}>
        <Text style={styles.label}>Элементы</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Например: a, b, c"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{elementsCount}</Text>
            <Text style={styles.statLabel}>Элементов</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{subsets.length}</Text>
            <Text style={styles.statLabel}>Подмножеств</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={subsets}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderSubset}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 20,
  },
  heading: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '700',
  },
  subheading: {
    color: '#cbd5f5',
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 40,
  },
  subsetItem: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  subsetIndex: {
    color: '#94a3b8',
    marginRight: 12,
    width: 28,
  },
  subsetScroll: {
    flexGrow: 1,
  },
  subsetText: {
    color: '#22c55e',
    fontSize: 16,
  },
});

export default UseMemoScreen;

