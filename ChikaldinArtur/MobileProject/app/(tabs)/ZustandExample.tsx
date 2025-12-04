import { View, Text, Button, FlatList, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useBearStore } from '../store';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const bears = useBearStore((state) => state.bears);
  const count = useBearStore((state) => state.count);
  const addBear = useBearStore((state) => state.addBear);
  const removeBear = useBearStore((state) => state.removeBear);
  const clearBears = useBearStore((state) => state.clearBears);

  const handleAdd = () => {
    if (!name.trim()) return Alert.alert('Введите имя медведя!');
    addBear(name);
    setName('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Всего медведей: {count}
      </Text>

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        <TextInput
          placeholder="Имя медведя"
          value={name}
          onChangeText={setName}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 8,
          }}
        />
        <Button title="Добавить" onPress={handleAdd} />
      </View>

      <Button title="Очистить всех" color="red" onPress={clearBears} />

      <FlatList
        data={bears}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              backgroundColor: '#f0f0f0',
              marginVertical: 5,
              borderRadius: 8,
            }}
          >
            <Text>{item.name}</Text>
            <Button title="Удалить" color="darkred" onPress={() => removeBear(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text>Нет медведей</Text>}
      />
    </View>
  );
}