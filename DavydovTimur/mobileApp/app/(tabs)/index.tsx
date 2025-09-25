import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Счётчик</Text>
      <Text style={styles.value}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="-1" onPress={() => setCount(count - 1)} />
        <Button title="+1" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
  },
  value: {
    fontSize: 48,
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
});
