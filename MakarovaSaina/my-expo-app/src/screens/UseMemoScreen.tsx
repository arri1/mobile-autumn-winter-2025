import React, { useMemo, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  FlatList,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

type User = {
  id: number;
  name: string;
  age: number;
  department: string;
};

export default function UseMemoScreen({ navigation }: any) {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Алексей', age: 25, department: 'Разработка' },
    { id: 2, name: 'Мария', age: 30, department: 'Дизайн' },
    { id: 3, name: 'Иван', age: 28, department: 'Маркетинг' },
    { id: 4, name: 'Ольга', age: 35, department: 'Разработка' },
    { id: 5, name: 'Дмитрий', age: 22, department: 'Дизайн' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    department: ''
  });

  const filteredUsers = useMemo(() => {
    console.log('🔍 Фильтрация пользователей...');
    
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(user =>
        user.department === selectedDepartment
      );
    }
    
    return filtered;
  }, [users, searchTerm, selectedDepartment]);

  const userStats = useMemo(() => {
    console.log('📊 Вычисление статистики...');
    
    const totalUsers = filteredUsers.length;
    const averageAge = totalUsers > 0 
      ? filteredUsers.reduce((sum, user) => sum + user.age, 0) / totalUsers 
      : 0;
    
    const departmentCount = filteredUsers.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      averageAge: Math.round(averageAge * 10) / 10,
      departmentCount
    };
  }, [filteredUsers]);

  const departments = useMemo(() => {
    return [...new Set(users.map(user => user.department))];
  }, [users]);

  const expensiveCalculation = useMemo(() => {
    console.log('⚡ Выполнение сложных вычислений...');
    
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * Math.random();
    }
    
    return {
      computedValue: Math.round(result * 100) / 100,
      timestamp: new Date().toLocaleTimeString()
    };
  }, [users.length]);

  const addUser = () => {
    if (newUserName.trim()) {
      const newUser: User = {
        id: Date.now(),
        name: newUserName,
        age: Math.floor(Math.random() * 30) + 20,
        department: departments[Math.floor(Math.random() * departments.length)]
      };
      setUsers(prev => [...prev, newUser]);
      setNewUserName('');
      Alert.alert('Успех', `Пользователь ${newUserName} добавлен!`);
    }
  };

  const deleteUser = (user: User) => {
    Alert.alert(
      'Удаление пользователя',
      `Вы уверены, что хотите удалить ${user.name}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: () => {
            setUsers(prev => prev.filter(u => u.id !== user.id));
            Alert.alert('Успех', `Пользователь ${user.name} удален!`);
          }
        }
      ]
    );
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      age: user.age.toString(),
      department: user.department
    });
    setEditModalVisible(true);
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    const age = parseInt(editForm.age);
    if (!editForm.name.trim() || isNaN(age) || age < 1 || age > 150 || !editForm.department.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля корректно');
      return;
    }

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: editForm.name, age, department: editForm.department }
        : user
    ));

    setEditModalVisible(false);
    setEditingUser(null);
    Alert.alert('Успех', `Данные пользователя обновлены!`);
  };

  const UserItem = React.memo(({ user, onEdit, onDelete, onPress }: { 
    user: User; 
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onPress: (user: User) => void;
  }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => onPress(user)}
      activeOpacity={0.7}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userDetails}>Возраст: {user.age}</Text>
        <Text style={styles.userDetails}>Отдел: {user.department}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(user)}
        >
          <Text style={styles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(user)}
        >
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

  const showUserDetails = (user: User) => {
    Alert.alert(
      user.name,
      `Возраст: ${user.age}\nОтдел: ${user.department}\nID: ${user.id}`,
      [
        { text: 'Редактировать', onPress: () => openEditModal(user) },
        { text: 'Удалить', style: 'destructive', onPress: () => deleteUser(user) },
        { text: 'OK', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Text style={styles.title}>useMemo 🧠</Text>
          <Text style={styles.subtitle}>Оптимизация производительности</Text>
          
          <View style={styles.controlsContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск по имени..."
              placeholderTextColor="#C5C6C7"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={styles.departmentFilter}>
              <Text style={styles.filterTitle}>Фильтр по отделу:</Text>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    selectedDepartment === '' && styles.filterButtonActive
                  ]}
                  onPress={() => setSelectedDepartment('')}
                >
                  <Text style={[
                    styles.filterButtonText,
                    selectedDepartment === '' && styles.filterButtonTextActive
                  ]}>Все</Text>
                </TouchableOpacity>
                {departments.map(dept => (
                  <TouchableOpacity
                    key={dept}
                    style={[
                      styles.filterButton,
                      selectedDepartment === dept && styles.filterButtonActive
                    ]}
                    onPress={() => setSelectedDepartment(dept)}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      selectedDepartment === dept && styles.filterButtonTextActive
                    ]}>{dept}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>📊 Статистика</Text>
            <Text style={styles.statsText}>Всего пользователей: {userStats.totalUsers}</Text>
            <Text style={styles.statsText}>Средний возраст: {userStats.averageAge}</Text>
            <Text style={styles.statsText}>
              Отделы: {Object.entries(userStats.departmentCount).map(([dept, count]) => 
                `${dept}: ${count}`
              ).join(', ')}
            </Text>
            <Text style={styles.statsText}>Результат вычислений: {expensiveCalculation.computedValue}</Text>
            <Text style={styles.statsText}>Вычислено в: {expensiveCalculation.timestamp}</Text>
          </View>        

          <View style={styles.addUserContainer}>
            <TextInput
              style={styles.addUserInput}
              placeholder="Имя нового пользователя"
              placeholderTextColor="#C5C6C7"
              value={newUserName}
              onChangeText={setNewUserName}
            />
            <TouchableOpacity 
              style={[
                styles.addUserButton,
                !newUserName.trim() && styles.addUserButtonDisabled
              ]} 
              onPress={addUser}
              disabled={!newUserName.trim()}
            >
              <Text style={styles.addUserButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>
              Пользователи ({filteredUsers.length})
            </Text>
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <UserItem 
                  user={item} 
                  onEdit={openEditModal}
                  onDelete={deleteUser}
                  onPress={showUserDetails}
                />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Пользователи не найдены</Text>
              }
              style={styles.list}
              scrollEnabled={false}
            />
          </View>

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
              onPress={() => navigation.navigate('UseEffect')}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>← К useEffect</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigation.navigate('Home')}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>← На главную</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <Modal
          visible={editModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Редактирование пользователя</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Имя"
                placeholderTextColor="#C5C6C7"
                value={editForm.name}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Возраст"
                placeholderTextColor="#C5C6C7"
                value={editForm.age}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, age: text }))}
                keyboardType="numeric"
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Отдел"
                placeholderTextColor="#C5C6C7"
                value={editForm.department}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, department: text }))}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleEditUser}
                >
                  <Text style={styles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    textAlign: 'center',
    marginBottom: 24,
  },
  controlsContainer: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#0B0C10',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 12,
    fontSize: 16,
  },
  departmentFilter: {
    marginTop: 8,
  },
  filterTitle: {
    fontSize: 14,
    color: '#C5C6C7',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#2D3748',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  filterButtonActive: {
    backgroundColor: '#45A29E',
  },
  filterButtonText: {
    color: '#C5C6C7',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#0B0C10',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#66FCF1',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#66FCF1',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#C5C6C7',
    marginBottom: 4,
  },
  addUserContainer: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  addUserInput: {
    flex: 1,
    backgroundColor: '#0B0C10',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  addUserButton: {
    backgroundColor: '#45A29E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addUserButtonDisabled: {
    backgroundColor: '#2D3748',
    opacity: 0.5,
  },
  addUserButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    backgroundColor: '#1F2833',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#66FCF1',
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#0B0C10',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#45A29E',
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
  userDetails: {
    fontSize: 14,
    color: '#C5C6C7',
    marginBottom: 2,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 36,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#45A29E',
  },
  deleteButton: {
    backgroundColor: '#f97a9cff',
  },
  actionButtonText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#C5C6C7',
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1F2833',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#0B0C10',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2D3748',
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  saveButton: {
    backgroundColor: '#45A29E',
  },
  cancelButtonText: {
    color: '#C5C6C7',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 16,
  },
});