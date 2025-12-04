import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Task } from '../types';
import { styles } from '../styles/Import'

export const fetchTasksFromAPI = (): Promise<Task[]> => {
  console.log('🔗 USE EFFECT: Загрузка данных с сервера...');
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Изучить React Native',
          completed: true,
          createdAt: new Date(),
        },
        {
          id: '2', 
          title: 'Понять hooks useEffect',
          completed: false,
          createdAt: new Date(),
        },
        {
          id: '3',
          title: 'Сделать лабораторную работу',
          completed: false,
          createdAt: new Date(),
        },
      ];
      resolve(mockTasks);
    }, 2000); 
  });
};
interface TodoScreenProps {
    navigation?: any;
}
export const TodoScreen: React.FC<TodoScreenProps> = ({ navigation })  => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
 
  useEffect(() => {
    console.log('🔄 USE EFFECT: Компонент смонтирован, начинаю загрузку...');
    
    const loadTasks = async () => {
      try {
        setError(null);
        const fetchedTasks = await fetchTasksFromAPI();
        setTasks(fetchedTasks);
        console.log('✅ USE EFFECT: Данные успешно загружены!');
      } catch (err) {
        setError('Ошибка загрузки задач');
        console.log('❌ USE EFFECT: Ошибка загрузки данных');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();

    return () => {
      console.log('🧹 USE EFFECT: Компонент будет размонтирован');
    };
  }, []); 

  useEffect(() => {
    console.log('📊 USE EFFECT: tasks изменились', tasks.length);
  }, [tasks]); 

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Лаб. 2: UseEffect</Text>
        <Text style={styles.subtitle}>Загрузка данных с сервера...</Text>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          Имитация загрузки с внешнего API (2 секунды)
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Ошибка</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лаб. 2: UseEffect</Text>
      <Text style={styles.subtitle}>Данные загружены с сервера</Text>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Загружено задач: {tasks.length}
        </Text>
        <Text style={styles.statsText}>
          Выполнено: {tasks.filter(t => t.completed).length}
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[
              styles.taskText,
              item.completed && styles.completedTask
            ]}>
              {item.completed ? '✅' : '⏳'} {item.title}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
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

