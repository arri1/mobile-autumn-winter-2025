import React, { useMemo, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

const allPeople = Array.from({ length: 10_000 }, (_, i) => ({
  id: i + 1,
  name: `Пользователь ${i + 1}`,
}));

function slowFilterAndSort(searchTerm: string) {
  const start = Date.now();

  let result = allPeople.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  result.sort((a, b) => {
    const numA = parseInt(a.name.split(' ')[1], 10);
    const numB = parseInt(b.name.split(' ')[1], 10);
    return numA - numB;
  });

  while (Date.now() - start < 2000) {
  }

  return result;
}

export default function UseMemoScreen() {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  const filteredPeople = useMemo(() => {
    console.log('Фильтрация и сортировка...');
    if (!search.trim()) return allPeople;
    return slowFilterAndSort(search);
  }, [search]);

  const handleSearch = () => {
    setSearch(inputValue);
  };

  return (
    <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
      <TextInput
        placeholder="Введите число:"
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleSearch}
      />
      <Button title="Найти" onPress={handleSearch} />

      <Text style={{ marginTop: 10 }}>Найдено: {filteredPeople.length}</Text>

      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        style={{ marginTop: 10 }}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}