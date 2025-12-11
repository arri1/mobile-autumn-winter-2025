import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Счётчик: {count}</Text>
      <View style={styles.buttonWrap}>
        <Button title="Увеличить" onPress={increment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonWrap: {
    width: 150,
  },
});
