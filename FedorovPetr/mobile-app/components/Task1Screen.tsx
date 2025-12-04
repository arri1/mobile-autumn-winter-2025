import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useCounter } from './useCounter';

interface Task1ScreenProps {
  onBack: () => void;
}

export default function Task1Screen({ onBack }: Task1ScreenProps) {
  const { count, increment, decrement, reset } = useCounter(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage('кнопка 1');
    const timerId = setTimeout(() => setMessage(null), 1200);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setMessage(`Значение счётчика: ${count}`);
    const timerId = setTimeout(() => setMessage(null), 1000);
    return () => clearTimeout(timerId);
  }, [count]);

  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Назад</Text>
      </Pressable>
      <Text style={styles.body}>Значение счётчика: {count}</Text>
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable style={styles.buttonPrimary} onPress={increment}>
          <Text style={styles.buttonPrimaryText}>+1</Text>
        </Pressable>
      </View>
      <Pressable style={styles.buttonGhost} onPress={reset}>
        <Text style={styles.buttonGhostText}>Сброс</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#4f46e5',
    fontWeight: '600',
    fontSize: 16,
  },
  message: {
    position: 'absolute',
    top: 64,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
    color: '#3730a3',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  buttonPrimary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonGhost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonGhostText: {
    color: '#6b7280',
  },
});

