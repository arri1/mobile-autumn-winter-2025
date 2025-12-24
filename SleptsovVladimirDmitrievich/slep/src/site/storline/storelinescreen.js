
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Modal,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTodoStore } from './TodoStore';

export default function StoreLineScreen() {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearAllTodos,
    getTodosCount
  } = useTodoStore();

  const [newTodoText, setNewTodoText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#2196F3',
      modalBackground: '#FFFFFF',
      inputBackground: '#FFFFFF',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
      button: '#00a100ff',
      modalBackground: '#2D2D2D',
      inputBackground: '#2D2D2D',
    }
  };

  const currentTheme = theme.dark;

  const handleAddTodo = () => {
    if (newTodoText.trim().length === 0) {
      Alert.alert('Ошибка', 'Введите текст задачи');
      return;
    }

    addTodo(newTodoText);
    setNewTodoText('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleToggleTodo = (id) => {
    toggleTodo(id);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (editText.trim().length === 0) {
      Alert.alert('Ошибка', 'Текст задачи не может быть пустым');
      return;
    }

    editTodo(editingTodo.id, editText);
    setModalVisible(false);
    setEditingTodo(null);
    setEditText('');
  };

  const handleClearAllTodos = () => {
    if (todos.length === 0) return;
    
    Alert.alert(
      'Очистка',
      'Вы уверены, что хотите удалить все задачи?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Очистить', 
          style: 'destructive', 
          onPress: () => clearAllTodos()
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const { total, completed } = getTodosCount();

  const renderTodoItem = ({ item }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleToggleTodo(item.id)}
      >
        <View style={[styles.checkboxInner, item.completed && styles.checkboxChecked]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.todoContent}>
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.text}
        </Text>
        <Text style={styles.todoDate}>{item.createdAt}</Text>
      </View>
      
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openEditModal(item)}
        >
          <Text style={styles.editButtonText}>Изменить</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTodo(item.id)}
        >
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: currentTheme.text,
      textAlign: 'center',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    statCard: {
      backgroundColor: currentTheme.card,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.text,
    },
    statLabel: {
      fontSize: 12,
      color: currentTheme.text,
      opacity: 0.8,
      marginTop: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    textInput: {
      flex: 1,
      backgroundColor: currentTheme.inputBackground,
      padding: 15,
      borderRadius: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
      color: currentTheme.text,
      fontSize: 16,
    },
    addButton: {
      backgroundColor: currentTheme.button,
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    todoItem: {
      flexDirection: 'row',
      backgroundColor: currentTheme.card,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    completedTodo: {
      opacity: 0.7,
    },
    checkbox: {
      marginRight: 12,
    },
    checkboxInner: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: currentTheme.button,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: currentTheme.button,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
    },
    todoContent: {
      flex: 1,
    },
    todoText: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 4,
    },
    completedText: {
      textDecorationLine: 'line-through',
      opacity: 0.7,
    },
    todoDate: {
      fontSize: 12,
      color: currentTheme.text,
      opacity: 0.6,
    },
    todoActions: {
      flexDirection: 'row',
    },
    editButton: {
      padding: 8,
      marginRight: 5,
      backgroundColor: '#ffff00ff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    editButtonText: {
      fontSize: 18,
      color: '#000000ff',
      fontWeight: 'bold',
    },
    deleteButton: {
      padding: 8,
      backgroundColor: '#ff0000ff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    deleteButtonText: {
      fontSize: 18,
      color: '#000000ff',
      fontWeight: 'bold',
    },
    clearButton: {
      backgroundColor: '#FF3B30',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    clearButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      color: currentTheme.text,
      opacity: 0.7,
      textAlign: 'center',
      marginTop: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#00000080',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: currentTheme.modalBackground,
      padding: 20,
      borderRadius: 10,
      margin: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: currentTheme.text,
      textAlign: 'center',
    },
    modalInput: {
      backgroundColor: currentTheme.inputBackground,
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
      color: currentTheme.text,
      fontSize: 16,
      marginBottom: 15,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: '#666',
    },
    saveButton: {
      backgroundColor: currentTheme.button,
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Список задач</Text>

      {/* Статистика */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Всего</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completed}</Text>
          <Text style={styles.statLabel}>Выполнено</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total - completed}</Text>
          <Text style={styles.statLabel}>Осталось</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Добавить новую задачу..."
          placeholderTextColor={currentTheme.text + '80'}
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={handleAddTodo}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, !newTodoText.trim() && { opacity: 0.5 }]}
          onPress={handleAddTodo}
          disabled={!newTodoText.trim()}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[currentTheme.button]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Нет задач</Text>
          </View>
        }
        ListFooterComponent={
          todos.length > 0 ? (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearAllTodos}>
              <Text style={styles.clearButtonText}>Очистить все задачи</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Редактировать задачу</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              multiline={true}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveEdit}
              >
                <Text style={styles.modalButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}