import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const UseStateScreen = () => {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#0f172a' }]}>
        useState
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: isDark ? '#e2e8f0' : '#0f172a' }]}>
          Тёмная тема
        </Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[styles.counter, { color: isDark ? '#fff' : '#0f172a' }]}>
        {count}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount((prev) => prev - 1)}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  counter: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    marginHorizontal: 8,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
});

export default UseStateScreen;