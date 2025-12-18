import React, { useMemo, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { UseMemoStyles } from './UseMemoStyle';

type User = {
  id: number;
  name: string;
  age: number;
  department: string;
};

export default function UseMemoLab({ navigation }: any) {
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
  const [editForm, setEditForm] = useState({ name: '', age: '', department: '' });

  const filteredUsers = useMemo(() => {
    console.log('🔍 Фильтрация пользователей...');
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(user => user.department === selectedDepartment);
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

  const departments = useMemo(() => [...new Set(users.map(user => user.department))], [users]);

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
    Alert.alert('Удаление пользователя', `Вы уверены, что хотите удалить ${user.name}?`, [
      { text: 'Отмена', style: 'cancel' },
      { 
        text: 'Удалить', 
        style: 'destructive',
        onPress: () => {
          setUsers(prev => prev.filter(u => u.id !== user.id));
          Alert.alert('Успех', `Пользователь ${user.name} удален!`);
        }
      }
    ]);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm({ name: user.name, age: user.age.toString(), department: user.department });
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

  const UserItemComponent = ({
    user,
    onEdit,
    onDelete,
    onPress,
  }: {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    onPress: (user: User) => void;
  }) => (
    <TouchableOpacity
      style={UseMemoStyles.userCard}
      onPress={() => onPress(user)}
      activeOpacity={0.7}
    >
      <View style={UseMemoStyles.userInfo}>
        <Text style={UseMemoStyles.userName}>{user.name}</Text>
        <Text style={UseMemoStyles.userDetails}>Возраст: {user.age}</Text>
        <Text style={UseMemoStyles.userDetails}>Отдел: {user.department}</Text>
      </View>
      <View style={UseMemoStyles.userActions}>
        <TouchableOpacity
          style={[UseMemoStyles.actionButton, UseMemoStyles.editButton]}
          onPress={() => onEdit(user)}
        >
          <Text style={UseMemoStyles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[UseMemoStyles.actionButton, UseMemoStyles.deleteButton]}
          onPress={() => onDelete(user)}
        >
          <Text style={UseMemoStyles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  UserItemComponent.displayName = 'UserItem';

  const UserItem = React.memo(UserItemComponent);

  const showUserDetails = (user: User) => {
    Alert.alert(user.name, `Возраст: ${user.age}\nОтдел: ${user.department}\nID: ${user.id}`, [
      { text: 'Редактировать', onPress: () => openEditModal(user) },
      { text: 'Удалить', style: 'destructive', onPress: () => deleteUser(user) },
      { text: 'OK', style: 'cancel' }
    ]);
  };

  return (
    <SafeAreaView style={UseMemoStyles.safeArea}>
      <KeyboardAvoidingView style={UseMemoStyles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Text style={UseMemoStyles.title}>useMemo 🧠</Text>
          <Text style={UseMemoStyles.subtitle}>Оптимизация производительности</Text>
          
          <View style={UseMemoStyles.controlsContainer}>
            <TextInput
              style={UseMemoStyles.searchInput}
              placeholder="Поиск по имени..."
              placeholderTextColor="#C5C6C7"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            
            <View style={UseMemoStyles.departmentFilter}>
              <Text style={UseMemoStyles.filterTitle}>Фильтр по отделу:</Text>
              <View style={UseMemoStyles.filterButtons}>
                <TouchableOpacity
                  style={[UseMemoStyles.filterButton, selectedDepartment === '' && UseMemoStyles.filterButtonActive]}
                  onPress={() => setSelectedDepartment('')}
                >
                  <Text style={[UseMemoStyles.filterButtonText, selectedDepartment === '' && UseMemoStyles.filterButtonTextActive]}>Все</Text>
                </TouchableOpacity>
                {departments.map(dept => (
                  <TouchableOpacity
                    key={dept}
                    style={[UseMemoStyles.filterButton, selectedDepartment === dept && UseMemoStyles.filterButtonActive]}
                    onPress={() => setSelectedDepartment(dept)}
                  >
                    <Text style={[UseMemoStyles.filterButtonText, selectedDepartment === dept && UseMemoStyles.filterButtonTextActive]}>{dept}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={UseMemoStyles.statsContainer}>
            <Text style={UseMemoStyles.statsTitle}>📊 Статистика</Text>
            <Text style={UseMemoStyles.statsText}>Всего пользователей: {userStats.totalUsers}</Text>
            <Text style={UseMemoStyles.statsText}>Средний возраст: {userStats.averageAge}</Text>
            <Text style={UseMemoStyles.statsText}>
              Отделы: {Object.entries(userStats.departmentCount).map(([dept, count]) => `${dept}: ${count}`).join(', ')}
            </Text>
            <Text style={UseMemoStyles.statsText}>Результат вычислений: {expensiveCalculation.computedValue}</Text>
            <Text style={UseMemoStyles.statsText}>Вычислено в: {expensiveCalculation.timestamp}</Text>
          </View>        

          <View style={UseMemoStyles.addUserContainer}>
            <TextInput
              style={UseMemoStyles.addUserInput}
              placeholder="Имя нового пользователя"
              placeholderTextColor="#C5C6C7"
              value={newUserName}
              onChangeText={setNewUserName}
            />
            <TouchableOpacity 
              style={[UseMemoStyles.addUserButton, !newUserName.trim() && UseMemoStyles.addUserButtonDisabled]} 
              onPress={addUser}
              disabled={!newUserName.trim()}
            >
              <Text style={UseMemoStyles.addUserButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>

          <View style={UseMemoStyles.listContainer}>
            <Text style={UseMemoStyles.listTitle}>Пользователи ({filteredUsers.length})</Text>
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
              ListEmptyComponent={<Text style={UseMemoStyles.emptyText}>Пользователи не найдены</Text>}
              style={UseMemoStyles.list}
              scrollEnabled={false}
            />
          </View>

          <View style={UseMemoStyles.navigationButtons}>
            <TouchableOpacity style={UseMemoStyles.navButton} onPress={() => navigation.navigate('UseState')}>
              <Text style={UseMemoStyles.navButtonText}>← К useState</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={UseMemoStyles.navButton} onPress={() => navigation.navigate('UseEffect')}>
              <Text style={UseMemoStyles.navButtonText}>← К useEffect</Text>
            </TouchableOpacity>

            <TouchableOpacity style={UseMemoStyles.navButton} onPress={() => navigation.navigate('Home')}>
              <Text style={UseMemoStyles.navButtonText}>← На главную</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal visible={editModalVisible} animationType="slide" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
          <View style={UseMemoStyles.modalOverlay}>
            <View style={UseMemoStyles.modalContent}>
              <Text style={UseMemoStyles.modalTitle}>Редактирование пользователя</Text>
              
              <TextInput
                style={UseMemoStyles.modalInput}
                placeholder="Имя"
                placeholderTextColor="#C5C6C7"
                value={editForm.name}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, name: text }))}
              />
              
              <TextInput
                style={UseMemoStyles.modalInput}
                placeholder="Возраст"
                placeholderTextColor="#C5C6C7"
                value={editForm.age}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, age: text }))}
                keyboardType="numeric"
              />
              
              <TextInput
                style={UseMemoStyles.modalInput}
                placeholder="Отдел"
                placeholderTextColor="#C5C6C7"
                value={editForm.department}
                onChangeText={(text) => setEditForm(prev => ({ ...prev, department: text }))}
              />

              <View style={UseMemoStyles.modalButtons}>
                <TouchableOpacity style={[UseMemoStyles.modalButton, UseMemoStyles.cancelButton]} onPress={() => setEditModalVisible(false)}>
                  <Text style={UseMemoStyles.cancelButtonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[UseMemoStyles.modalButton, UseMemoStyles.saveButton]} onPress={handleEditUser}>
                  <Text style={UseMemoStyles.saveButtonText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}