import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useUiStore } from '../store/uiStore';

export default function ZustandEditScreen() {
  const { message, counter, setMessage, increment, reset } = useUiStore();
  const [localMessage, setLocalMessage] = useState(message);

  const handleSaveMessage = () => {
    setMessage(localMessage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.label}>Сообщение:</Text>
        <TextInput
          style={styles.input}
          value={localMessage}
          onChangeText={setLocalMessage}
          placeholder="Введите текст"
        />
        <Button title="Сохранить сообщение" onPress={handleSaveMessage} />
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Счётчик: {counter}</Text>
        <Button title="Увеличить счётчик" onPress={increment} />
      </View>

      <View style={styles.block}>
        <Button title="Сбросить всё" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  block: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});


