import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

interface HomeScreenProps {
  onNavigate: (screen: 'task1' | 'task2' | 'task3') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [message, setMessage] = useState<string | null>(null);


  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.navButton} onPress={() => onNavigate('task1')}>
          <Text style={styles.buttonText}>Кнопка 1</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => onNavigate('task2')}>
          <Text style={styles.buttonText}>Кнопка 2</Text>
        </Pressable>
        <Pressable style={styles.navButton} onPress={() => onNavigate('task3')}>
          <Text style={styles.buttonText}>Кнопка 3</Text>
        </Pressable>
      </View>
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
    marginBottom: 32,
    fontWeight: '600',
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
  buttonContainer: {
    gap: 16,
    width: '80%',
  },
  navButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

