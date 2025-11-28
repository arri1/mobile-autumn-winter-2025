import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useMemoStyles } from '../styles/useMemoStyles';

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
    <View style={useMemoStyles.subsetItem}>
      <Text style={useMemoStyles.subsetIndex}>{index + 1}.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={useMemoStyles.subsetScroll}
      >
        <Text style={useMemoStyles.subsetText}>
          {item.length ? `{${item.join(', ')}}` : '∅'}
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={useMemoStyles.container}>
      <Text style={useMemoStyles.heading}>UseMemo</Text>

      <View style={useMemoStyles.card}>
        <Text style={useMemoStyles.label}>Элементы</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Например: a, b, c"
          placeholderTextColor="#94a3b8"
          style={useMemoStyles.input}
        />

        <View style={useMemoStyles.stats}>
          <View style={useMemoStyles.stat}>
            <Text style={useMemoStyles.statValue}>{elementsCount}</Text>
            <Text style={useMemoStyles.statLabel}>Элементов</Text>
          </View>
          <View style={useMemoStyles.stat}>
            <Text style={useMemoStyles.statValue}>{subsets.length}</Text>
            <Text style={useMemoStyles.statLabel}>Подмножеств</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={subsets}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderSubset}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={useMemoStyles.listContent}
      />
    </View>
  );
};

export default UseMemoScreen;