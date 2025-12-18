import { StyleSheet, Text, View } from 'react-native';
import { useUiStore } from '../store/uiStore';

export default function ZustandViewScreen() {
  const { message, counter } = useUiStore();

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.label}>Текущее сообщение:</Text>
        <Text style={styles.value}>{message}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.label}>Текущее значение счётчика:</Text>
        <Text style={styles.value}>{counter}</Text>
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
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});


