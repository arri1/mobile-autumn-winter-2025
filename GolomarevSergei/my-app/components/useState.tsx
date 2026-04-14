import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

export default function UseState() {
  // Счётчик
  const [count, setCount] = useState(0);

  // Текстовое поле
  const [text, setText] = useState('');

  // Переключатель
  const [isVisible, setIsVisible] = useState(true);

  // Список дел
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  // Функции для счётчика
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const resetCounter = () => setCount(0);

  // Функции для списка дел
  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, todoInput]);
      setTodoInput('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Примеры useState</Text>

      {/* Счётчик */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Счётчик</Text>
        <Text style={styles.description}>Управление числовым значением</Text>
        
        <View style={styles.counterBox}>
          <Text style={styles.counterText}>{count}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Text style={styles.buttonText}>−</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetCounter}>
            <Text style={styles.buttonText}>Сброс</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Текстовое поле */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Изменение текста</Text>
        <Text style={styles.description}>Управление текстовым значением</Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
          placeholderTextColor="#999"
        />
        
        {text ? (
          <View style={styles.textBox}>
            <Text style={styles.textBoxTitle}>Вы ввели:</Text>
            <Text style={styles.textBoxContent}>{text}</Text>
            <Text style={styles.textLength}>Символов: {text.length}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>Начните писать...</Text>
        )}
      </View>

      {/* Переключатель */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Переключатель (Toggle)</Text>
        <Text style={styles.description}>Включение/выключение видимости</Text>
        
        <TouchableOpacity
          style={[styles.toggleButton, isVisible ? styles.toggleOn : styles.toggleOff]}
          onPress={() => setIsVisible(!isVisible)}
        >
          <Text style={styles.toggleText}>
            {isVisible ? '✓ Видно' : '✗ Скрыто'}
          </Text>
        </TouchableOpacity>

        {isVisible && (
          <View style={styles.visibleBox}>
            <Text style={styles.visibleText}>
              Это сообщение видно
            </Text>
          </View>
        )}
      </View>

      {/* Список дел */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Список дел (Todo List)</Text>
        <Text style={styles.description}>Управление массивом состояния</Text>
        
        <View style={styles.todoInputContainer}>
          <TextInput
            style={styles.todoInput}
            placeholder="Добавить задачу..."
            value={todoInput}
            onChangeText={setTodoInput}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {todos.length === 0 ? (
          <Text style={styles.emptyText}>Список пуст</Text>
        ) : (
          <View>
            {todos.map((todo, index) => (
              <View key={index} style={styles.todoItem}>
                <Text style={styles.todoText}>{todo}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeTodo(index)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  // Счётчик
  counterBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resetButton: {
    width: 70,
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  // Текстовое поле
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    color: '#333',
  },
  textBox: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  textBoxTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  textBoxContent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  textLength: {
    fontSize: 12,
    color: '#999',
  },
  // Переключатель
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleOn: {
    backgroundColor: '#34C759',
  },
  toggleOff: {
    backgroundColor: '#E0E0E0',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  visibleBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#34C759',
  },
  visibleText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  // Список дел
  todoInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  addButton: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 8,
  },
  todoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  spacer: {
    height: 20,
  },
});
