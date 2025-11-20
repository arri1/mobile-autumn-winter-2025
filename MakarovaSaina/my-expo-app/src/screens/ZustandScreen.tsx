import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useCounterStore } from '../store/useCounterStore';
import { useUserStore } from '../store/useUserStore';

export default function ZustandScreen({ navigation }: any) {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        <View style={styles.content}>
          <Text style={styles.title}>Zustand</Text>

          <CounterExample />

          <UserManagementExample />


          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigation.navigate('UseState')}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>← К useState</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigation.navigate('UseMemo')}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>→ К useMemo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerHint}
              onPress={openDrawer}
            >
              <Text style={styles.drawerHintText}>📖 Открыть меню навигации</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CounterExample() {
  const { count, increment, decrement, reset, setCount } = useCounterStore();
  const [customValue, setCustomValue] = useState('');

  const handleSetCustomValue = () => {
    const num = parseInt(customValue);
    if (!isNaN(num)) {
      setCount(num);
      setCustomValue('');
    }
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>🔢 Счетчик с Zustand</Text>
      <Text style={styles.exampleDescription}>
        Состояние сохраняется между перезагрузками приложения
      </Text>
      
      <View style={styles.counterDisplay}>
        <Text style={styles.counterValue}>{count}</Text>
      </View>

      <View style={styles.counterButtons}>
        <TouchableOpacity 
          style={styles.counterButton} 
          onPress={decrement}
        >
          <Text style={styles.counterButtonText}>-1</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.counterButton} 
          onPress={reset}
        >
          <Text style={styles.counterButtonText}>Сбросить</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.counterButton} 
          onPress={increment}
        >
          <Text style={styles.counterButtonText}>+1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.customInputContainer}>
        <TextInput
          style={styles.customInput}
          placeholder="Установить значение..."
          placeholderTextColor="#C5C6C7"
          value={customValue}
          onChangeText={setCustomValue}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={styles.setButton}
          onPress={handleSetCustomValue}
        >
          <Text style={styles.setButtonText}>Установить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function UserManagementExample() {
  const { users, addUser, removeUser, currentUser, setCurrentUser } = useUserStore();
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim() && newUserUsername.trim()) {
      addUser({
        name: newUserName.trim(),
        username: newUserUsername.trim().toLowerCase(),
      });
      setNewUserName('');
      setNewUserUsername('');
      Alert.alert('Успех', 'Пользователь добавлен!');
    }
  };

  const handleRemoveUser = (user: any) => {
    Alert.alert(
      'Удаление пользователя',
      `Удалить пользователя ${user.name}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: () => removeUser(user.id)
        }
      ]
    );
  };

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>👥 Управление пользователями</Text>
      <Text style={styles.exampleDescription}>
        Состояние пользователей
      </Text>

      {currentUser && (
        <View style={styles.currentUserContainer}>
          <Text style={styles.currentUserTitle}>Текущий пользователь:</Text>
          <Text style={styles.currentUserText}>{currentUser.name} (@{currentUser.username})</Text>
        </View>
      )}


      <View style={styles.addUserForm}>
        <TextInput
          style={styles.userInput}
          placeholder="Имя пользователя"
          placeholderTextColor="#C5C6C7"
          value={newUserName}
          onChangeText={setNewUserName}
        />
        <TextInput
          style={styles.userInput}
          placeholder="Логин"
          placeholderTextColor="#C5C6C7"
          value={newUserUsername}
          onChangeText={setNewUserUsername}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={[styles.addButton, (!newUserName.trim() || !newUserUsername.trim()) && styles.addButtonDisabled]}
          onPress={handleAddUser}
          disabled={!newUserName.trim() || !newUserUsername.trim()}
        >
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      {/* Список пользователей */}
      <Text style={styles.usersTitle}>Пользователи ({users.length}):</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userUsername}>@{item.username}</Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity 
                style={[styles.userActionButton, styles.selectButton]}
                onPress={() => setCurrentUser(item)}
              >
                <Text style={styles.userActionText}>Выбрать</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.userActionButton, styles.deleteButton]}
                onPress={() => handleRemoveUser(item)}
              >
                <Text style={styles.userActionText}>Удалить</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Нет пользователей</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2833',
    borderBottomWidth: 1,
    borderBottomColor: '#45A29E',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 36,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    marginBottom: 32,
    textAlign: 'center',
  },
  exampleContainer: {
    backgroundColor: '#1F2833',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff859bff',
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#C5C6C7',
    marginBottom: 16,
    lineHeight: 18,
  },
  
  counterDisplay: {
    backgroundColor: '#0B0C10',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#66FCF1',
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  counterButton: {
    flex: 1,
    backgroundColor: '#45A29E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 14,
  },
  customInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  customInput: {
    flex: 1,
    backgroundColor: '#0B0C10',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  setButton: {
    backgroundColor: '#ff859bff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  setButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 14,
  },
  
  currentUserContainer: {
    backgroundColor: '#0B0C10',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#66FCF1',
  },
  currentUserTitle: {
    fontSize: 14,
    color: '#C5C6C7',
    marginBottom: 4,
  },
  currentUserText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  addUserForm: {
    gap: 12,
    marginBottom: 16,
  },
  userInput: {
    backgroundColor: '#0B0C10',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#45A29E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 14,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  userItem: {
    backgroundColor: '#0B0C10',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 14,
    color: '#C5C6C7',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  userActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectButton: {
    backgroundColor: '#45A29E',
  },
  deleteButton: {
    backgroundColor: '#f97a9cff',
  },
  userActionText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#C5C6C7',
    fontStyle: 'italic',
    marginVertical: 20,
  },

  navigationButtons: {
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2D3748',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  navButtonText: {
    color: '#66FCF1',
    fontWeight: '600',
    fontSize: 14,
  },
  drawerHint: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff859bff',
  },
  drawerHintText: {
    color: '#ff859bff',
    fontWeight: '600',
    fontSize: 14,
  },
});