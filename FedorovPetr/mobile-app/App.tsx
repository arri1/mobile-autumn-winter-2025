import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useCallback } from 'react';

function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount((v) => v + 1), []);
  const decrement = useCallback(() => setCount((v) => Math.max(0, v - 1)), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

export default function App() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Счётчик: {count}</Text>
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable style={styles.buttonPrimary} onPress={increment}>
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
      </View>
      <Pressable style={styles.buttonGhost} onPress={reset}>
        <Text style={styles.buttonGhostText}>Сброс</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
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
  buttonGhost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonGhostText: {
    color: '#6b7280',
  },
});
