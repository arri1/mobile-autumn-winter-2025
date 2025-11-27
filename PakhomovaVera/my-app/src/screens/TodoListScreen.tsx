import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Todo } from '../types/types';
import { Button } from '../components/Button';
//import { getData, storeData, StorageKeys } from '../utils/storage';

interface TodoListScreenProps {
  onAddTodo: () => void;
  onLogout: () => void;
}

export const TodoListScreen: React.FC<TodoListScreenProps> = ({ 
  onAddTodo, 
  onLogout 
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);



  const completedCount = todos.filter(todo => todo.completed).length;

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={[
        styles.todoItem,
        item.completed && styles.completedTodo
      ]}
    
    >
      <View style={styles.todoContent}>
        <Text style={[
          styles.todoText,
          item.completed && styles.completedText
        ]}>
          {item.title}
        </Text>
        <View style={[
          styles.checkbox,
          item.completed && styles.checkedBox
        ]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои Задачи</Text>
        <Button title="Выйти" onPress={onLogout} variant="secondary" />
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Всего задач: {todos.length}
        </Text>
        <Text style={styles.statsText}>
          Выполнено: {completedCount}
        </Text>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Button title="Добавить задачу" onPress={onAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  stats: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  completedTodo: {
    opacity: 0.7,
    borderLeftColor: '#34C759',
  },
  todoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkedBox: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});