import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    console.log('Статистика пересчитана');
    return { total, completed, pending };
  }, [todos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
        console.log('Задачи загружены:', parsedTodos);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      console.log('Задачи сохранены');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        completed: false,
      };
      
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      setNewTodo('');
      
      console.log('Добавлена задача:', todo);
      console.log('Все задачи:', updatedTodos);
    }
  };
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    
    const todo = updatedTodos.find(t => t.id === id);
    console.log('Задача обновлена:', todo);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Менеджер задач</Text>
      <View style={styles.stats}>
        <Text>Всего: {stats.total}</Text>
        <Text>Выполнено: {stats.completed}</Text>
        <Text>Осталось: {stats.pending}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите задачу..."
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.todoList}>
        {todos.map(todo => (
          <View key={todo.id} style={[
            styles.todoItem,
            todo.completed && styles.completedTodo
          ]}>
            <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
              <Text style={[
                styles.todoText,
                todo.completed && styles.completedText
              ]}>
                {todo.title}
                {todo.completed && ' ✓'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  completedTodo: {
    backgroundColor: '#E8F5E8',
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  stats: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
});