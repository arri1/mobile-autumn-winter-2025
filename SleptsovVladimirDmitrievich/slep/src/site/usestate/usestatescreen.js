import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useTodoStore } from '../storline/todoStore';

export default function UseStateScreen() {

  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const { 
    todos, 
    getTodosCount, 
    clearAllTodos,
    deleteTodo 
  } = useTodoStore();

  const { total, completed } = getTodosCount();

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#4CAF50',
      danger: '#F44336',
      success: '#4CAF50',
      warning: '#FF9800',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
      button: '#2196F3',
      danger: '#D32F2F',
      success: '#388E3C',
      warning: '#F57C00',
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: currentTheme.text,
      textAlign: 'center',
    },
    card: {
      backgroundColor: currentTheme.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    text: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      color: currentTheme.text,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.text,
    },
    statLabel: {
      fontSize: 14,
      color: currentTheme.text,
      marginTop: 5,
    },
    button: {
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
    },
    primaryButton: {
      backgroundColor: currentTheme.button,
    },
    dangerButton: {
      backgroundColor: currentTheme.danger,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    todoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.border,
    },
    todoText: {
      fontSize: 16,
      color: currentTheme.text,
      flex: 1,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: currentTheme.danger,
      opacity: 0.6,
    },
    deleteButton: {
      padding: 8,
      backgroundColor: currentTheme.danger,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.text,
      marginTop: 20,
      marginBottom: 10,
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.background}
      />
      
      <Text style={styles.header}>Статистика задач</Text>
      
      <Text style={styles.sectionTitle}>
        Все задачи ({todos.length})
      </Text>
      
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.card}>
          {todos.length === 0 ? (
            <Text style={[styles.text, { textAlign: 'center' }]}>
              Задачи отсутствуют
            </Text>
          ) : (
            todos.map((todo) => (
              <View key={todo.id} style={styles.todoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={[
                    styles.todoText,
                    todo.completed && styles.completedText
                  ]}>
                    {todo.text}
                  </Text>
                  <Text style={[styles.text, { fontSize: 12, opacity: 0.7 }]}>
                    Создано: {todo.createdAt}
                  </Text>
                </View>
                

              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}