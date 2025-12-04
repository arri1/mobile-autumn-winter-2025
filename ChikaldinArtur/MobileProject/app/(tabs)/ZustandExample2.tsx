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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Всего медведей: {count}
      </Text>
    </View>
  );
}