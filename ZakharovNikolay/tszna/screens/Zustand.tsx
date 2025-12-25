import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useUiStore } from '../store/uiStore';

export default function ZustandScreen() {
  const { message, counter, setMessage, increment, reset } = useUiStore();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [localMessage, setLocalMessage] = useState(message);

  // Синхронизируем localMessage с message при переключении в режим edit
  useEffect(() => {
    if (mode === 'edit') {
      setLocalMessage(message);
    }
  }, [mode, message]);

  const handleSaveMessage = () => {
    setMessage(localMessage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'view' && styles.modeButtonActive]}
          onPress={() => setMode('view')}
        >
          <Text style={[styles.modeButtonText, mode === 'view' && styles.modeButtonTextActive]}>
            Просмотреть
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'edit' && styles.modeButtonActive]}
          onPress={() => setMode('edit')}
        >
          <Text style={[styles.modeButtonText, mode === 'edit' && styles.modeButtonTextActive]}>
            Редактировать
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'view' ? (
        <View style={styles.content}>
          <View style={styles.block}>
            <Text style={styles.label}>Текущее сообщение:</Text>
            <Text style={styles.value}>{message}</Text>
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>Текущее значение счётчика:</Text>
            <Text style={styles.value}>{counter}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.block}>
            <Text style={styles.label}>Сообщение:</Text>
            <TextInput
              style={styles.input}
              value={localMessage}
              onChangeText={setLocalMessage}
              placeholder="Введите текст"
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveMessage}>
              <Text style={styles.buttonText}>Сохранить сообщение</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <Text style={styles.label}>Счётчик: {counter}</Text>
            <TouchableOpacity style={styles.button} onPress={increment}>
              <Text style={styles.buttonText}>Увеличить счётчик</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset}>
              <Text style={styles.buttonText}>Сбросить всё</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#0000ff',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  block: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0000ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

