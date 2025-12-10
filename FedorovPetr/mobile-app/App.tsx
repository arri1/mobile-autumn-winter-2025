import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useCallback, useEffect, useMemo } from 'react';

function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = useCallback(() => setCount((v) => v + 1), []);
  const decrement = useCallback(() => setCount((v) => Math.max(0, v - 1)), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  return { count, increment, decrement, reset };
}

export default function App() {
  const { count, increment, decrement, reset } = useCounter(0);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const tasks = useMemo(
    () => [
      {
        id: 1,
        title: '',
        description: '',
        body: `Значение счётчика: ${count}`,
      },
      {
        id: 2,
        title: '',
        description: '',
        body: `Прогресс: ${Math.min(count * 10, 100)}%`,
      },
      {
        id: 3,
        title: '',
        description: '',
        body: count === 0 ? 'Состояние очищено.' : 'Ожидает очистки.',
      },
    ],
    [count],
  );
  const activeTask = tasks[activeTaskIndex];

  // runs once on mount, cleans up on unmount
  useEffect(() => {
    setMessage('Добро пожаловать!');
    const timerId = setTimeout(() => setMessage(null), 1500);
    return () => clearTimeout(timerId);
  }, []);

  // task change notification
  useEffect(() => {
    setMessage(`кнопка ${activeTask.id}`);
    const timerId = setTimeout(() => setMessage(null), 1200);
    return () => clearTimeout(timerId);
  }, [activeTask.id]);

  // counter change notification
  useEffect(() => {
    if (count === 0) return;
    setMessage(`Значение счётчика: ${count}`);
    const timerId = setTimeout(() => setMessage(null), 1000);
    return () => clearTimeout(timerId);
  }, [count]);

  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
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
      <View style={styles.navRow}>
        {tasks.map((task, idx) => (
          <Pressable
            key={task.id}
            style={[styles.navButton, idx === activeTaskIndex && styles.navButtonActive]}
            onPress={() => setActiveTaskIndex(idx)}
          >
            <Text style={[styles.buttonText, idx === activeTaskIndex && styles.navButtonActiveText]}>
              Кнопка {task.id}
            </Text>
          </Pressable>
        ))}
      </View>
      <View>
        <Text style={styles.sectionTitle}>{activeTask.title}</Text>
        <Text style={styles.sectionDescription}>{activeTask.description}</Text>
        <Text style={styles.sectionBody}>{activeTask.body}</Text>
        {activeTask.id === 2 && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(count * 10, 100)}%` }]} />
          </View>
        )}
      </View>
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
  message: {
    position: 'absolute',
    top: 64,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
    color: '#3730a3',
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#312e81',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#4338ca',
  },
  sectionBody: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  navRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
  },
  navButtonActive: {
    backgroundColor: '#4c1d95',
    
  },
  navButtonActiveText: {
    color: '#fef3c7',
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#e0e7ff',
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
  },
});
