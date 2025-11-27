import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Task } from '../types';
import { styles } from '../styles/Analiz'

interface TodoAdvancedScreenProps {
    navigation?: any;
}

export const TodoAdvancedScreen: React.FC<TodoAdvancedScreenProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'completed' | 'active'>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const initialTasks: Task[] = [
      { id: '1', title: 'Купить продукты', completed: false, createdAt: new Date() },
      { id: '2', title: 'Сделать домашнее задание', completed: true, createdAt: new Date() },
      { id: '3', title: 'Почитать книгу', completed: false, createdAt: new Date() },
      { id: '4', title: 'Позвонить маме', completed: true, createdAt: new Date() },
      { id: '5', title: 'Записаться к врачу', completed: false, createdAt: new Date() },
      { id: '6', title: 'Изучить React Native hooks', completed: false, createdAt: new Date() },
    ];
    setTasks(initialTasks);
  }, []);

  const filteredByStatus = useMemo(() => {
    console.log('🔍 USE MEMO: Пересчет filteredByStatus');
    switch (filterCompleted) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filterCompleted]);

  const filteredTasks = useMemo(() => {
    console.log('🔍 USE MEMO: Пересчет filteredTasks');
    if (!searchTerm) return filteredByStatus;
    
    return filteredByStatus.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredByStatus, searchTerm]);

  const stats = useMemo(() => {
    console.log('📊 USE MEMO: Пересчет статистики');
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лаб. 3: UseMemo</Text>
      <Text style={styles.subtitle}>Оптимизация вычислений</Text>

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск задач..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        
        <View style={styles.filterButtons}>
          {(['all', 'active', 'completed'] as const).map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                filterCompleted === filter && styles.filterButtonActive
              ]}
              onPress={() => setFilterCompleted(filter)}
            >
              <Text style={[
                styles.filterButtonText,
                filterCompleted === filter && styles.filterButtonTextActive
              ]}>
                {filter === 'all' && 'Все'}
                {filter === 'active' && 'Активные'}
                {filter === 'completed' && 'Выполненные'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Статистика (useMemo):</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statsItem}>Всего: {stats.total}</Text>
          <Text style={styles.statsItem}>Активные: {stats.active}</Text>
          <Text style={styles.statsItem}>Выполнено: {stats.completed}</Text>
        </View>
      </View>

      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Новая задача..."
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={[
              styles.taskText,
              item.completed && styles.completedTask
            ]}>
              {item.completed ? '✅' : '⏳'} {item.title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Задачи не найдены</Text>
        }
      />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.backButtonText}>← Назад к списку лаб</Text>
      </TouchableOpacity>
    </View>
  );
};

