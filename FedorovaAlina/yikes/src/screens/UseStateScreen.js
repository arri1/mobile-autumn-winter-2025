import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UseStateScreen({ goBack }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Привет!');
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Демонстрация useState</Text>
      
      {/* Счетчик */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. Счётчик</Text>
        <Text style={styles.counterText}>Текущее значение: {count}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.smallButton}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.smallButtonText}>➕ +1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.smallButton}
            onPress={() => setCount(count - 1)}
          >
            <Text style={styles.smallButtonText}>➖ -1</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.smallButton, styles.resetButton]}
            onPress={() => setCount(0)}
          >
            <Text style={styles.smallButtonText}>🔄 Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Текст */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>2. Изменение текста</Text>
        <Text style={styles.textDisplay}>{text}</Text>
        
        <TouchableOpacity
          style={styles.mediumButton}
          onPress={() => setText(text === 'Привет!' ? 'Пока!' : 'Привет!')}
        >
          <Text style={styles.mediumButtonText}>🔄 Поменять текст</Text>
        </TouchableOpacity>
      </View>

      {/* Переключатель */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>3. Булевый переключатель</Text>
        <Text style={styles.statusText}>
          Статус: {isActive ? '✅ Активен' : '❌ Не активен'}
        </Text>
        
        <TouchableOpacity
          style={[styles.mediumButton, isActive ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.mediumButtonText}>
            {isActive ? 'Выключить' : 'Включить'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка возврата */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={goBack}  // Используем переданную функцию
      >
        <Text style={styles.backButtonText}>← Назад на главную</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  counterText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3498db',
  },
  textDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#e74c3c',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#27ae60',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  smallButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
  },
  mediumButton: {
    backgroundColor: '#9b59b6',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  mediumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  activeButton: {
    backgroundColor: '#27ae60',
  },
  inactiveButton: {
    backgroundColor: '#e74c3c',
  },
  backButton: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
//