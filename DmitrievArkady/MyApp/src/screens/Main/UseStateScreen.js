import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UseStateScreen() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Счётчик</Text>
      
      <Text style={styles.counter}>{count}</Text>
      
      <View style={styles.buttonRow}>
        <Button title="-1" onPress={decrement}/>
        <Button title="Сброс" onPress={reset}/>
        <Button title="+1" onPress={increment}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
});