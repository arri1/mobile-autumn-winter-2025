import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { UsersStyles } from './UserScreenStyle';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/auth/client';

type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data?: {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export default function UsersScreen({ navigation }: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      setError(null);
      const response = await apiClient.get<ApiResponse>('/api/users');
      
      if (response.data.success && response.data.data) {
        setUsers(response.data.data.users);
        setFilteredUsers(response.data.data.users);
        setTotalUsers(response.data.data.total);
      } else {
        throw new Error(response.data.message || 'Не удалось загрузить пользователей');
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Ошибка при загрузке пользователей');
      Alert.alert('Ошибка', 'Не удалось загрузить список пользователей');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const handleUserPress = (user: User) => {
    const buttons: any[] = [
      { text: 'OK', style: 'cancel' as const }
    ];

    // Добавляем кнопку изменения роли только для админов
    if (currentUser?.role === 'ADMIN') {
      buttons.push({
        text: 'Изменить роль',
        onPress: () => changeUserRole(user),
      });
    }

    // Добавляем кнопку удаления только для админов и не для себя
    if (currentUser?.role === 'ADMIN' && user.id !== currentUser?.id) {
      buttons.push({
        text: 'Удалить',
        style: 'destructive' as const,
        onPress: () => deleteUser(user),
      });
    }

    Alert.alert(
      user.name || 'Пользователь',
      `Email: ${user.email}\nРоль: ${user.role}\nЗарегистрирован: ${new Date(user.createdAt).toLocaleDateString('ru-RU')}`,
      buttons
    );
  };

  const changeUserRole = (user: User) => {
    const buttons = [
      { text: 'Отмена', style: 'cancel' as const },
      {
        text: 'USER',
        onPress: () => updateUserRole(user.id, 'USER'),
      },
      {
        text: 'ADMIN',
        onPress: () => updateUserRole(user.id, 'ADMIN'),
      },
    ];

    Alert.alert(
      'Изменить роль пользователя',
      `Текущая роль: ${user.role}`,
      buttons
    );
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const response = await apiClient.patch(`/api/users/${userId}/role`, { role });
      
      if (response.data.success) {
        Alert.alert('Успех', 'Роль пользователя обновлена');
        fetchUsers();
      }
    } catch (err) {
      console.error('Error updating role:', err);
      Alert.alert('Ошибка', 'Не удалось обновить роль пользователя');
    }
  };

  const deleteUser = (user: User) => {
    const buttons = [
      { text: 'Отмена', style: 'cancel' as const },
      {
        text: 'Удалить',
        style: 'destructive' as const,
        onPress: async () => {
          try {
            const response = await apiClient.delete(`/api/users/${user.id}`);
            
            if (response.data.success) {
              Alert.alert('Успех', 'Пользователь удален');
              fetchUsers();
            }
          } catch (err) {
            console.error('Error deleting user:', err);
            Alert.alert('Ошибка', 'Не удалось удалить пользователя');
          }
        },
      },
    ];

    Alert.alert(
      'Удалить пользователя',
      `Вы уверены, что хотите удалить пользователя ${user.name || user.email}?`,
      buttons
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={UsersStyles.userCard}
      onPress={() => handleUserPress(item)}
      activeOpacity={0.7}
    >
      <View style={UsersStyles.avatar}>
        <Text style={UsersStyles.avatarText}>
          {item.name ? item.name.charAt(0).toUpperCase() : item.email.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={UsersStyles.userInfo}>
        <Text style={UsersStyles.userName}>
          {item.name || 'Без имени'}
        </Text>
        <Text style={UsersStyles.userEmail}>
          {item.email}
        </Text>
        <Text style={UsersStyles.userRole}>
          {item.role}
        </Text>
        <Text style={UsersStyles.userDate}>
          Зарегистрирован: {new Date(item.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={UsersStyles.safeArea}>
        <View style={UsersStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#66FCF1" />
          <Text style={{ color: '#C5C6C7', marginTop: 16 }}>Загрузка пользователей...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={UsersStyles.safeArea}>
        <View style={UsersStyles.errorContainer}>
          <Text style={UsersStyles.errorText}>{error}</Text>
          <TouchableOpacity style={UsersStyles.retryButton} onPress={fetchUsers}>
            <Text style={UsersStyles.retryButtonText}>Повторить попытку</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={UsersStyles.safeArea}>
      <View style={UsersStyles.container}>
        <View style={UsersStyles.header}>
          <Text style={UsersStyles.title}>👥 Пользователи</Text>
          <Text style={UsersStyles.subtitle}>Список зарегистрированных пользователей системы</Text>
        </View>

        <View style={UsersStyles.statsContainer}>
          <View style={UsersStyles.statCard}>
            <Text style={UsersStyles.statNumber}>{totalUsers}</Text>
            <Text style={UsersStyles.statLabel}>Всего</Text>
          </View>
          <View style={UsersStyles.statCard}>
            <Text style={UsersStyles.statNumber}>
              {users.filter(u => u.role === 'ADMIN').length}
            </Text>
            <Text style={UsersStyles.statLabel}>Админов</Text>
          </View>
          <View style={UsersStyles.statCard}>
            <Text style={UsersStyles.statNumber}>
              {users.filter(u => u.role === 'USER').length}
            </Text>
            <Text style={UsersStyles.statLabel}>Пользователей</Text>
          </View>
        </View>

        <View style={UsersStyles.controlsContainer}>
          <TextInput
            style={UsersStyles.searchInput}
            placeholder="Поиск по имени или email..."
            placeholderTextColor="#C5C6C7"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={UsersStyles.filterButton}
            onPress={() => {
              // Здесь можно добавить функционал фильтрации
              Alert.alert('Фильтры', 'Выберите критерии фильтрации');
            }}
          >
            <Text style={UsersStyles.filterButtonText}>Фильтр</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#66FCF1']}
              tintColor="#66FCF1"
            />
          }
          ListEmptyComponent={
            <View style={UsersStyles.emptyState}>
              <Text style={UsersStyles.emptyText}>
                {searchQuery ? 'Пользователи не найдены' : 'Нет зарегистрированных пользователей'}
              </Text>
              <Text style={UsersStyles.emptySubtext}>
                {searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Будьте первым!'}
              </Text>
            </View>
          }
        />

        <View style={UsersStyles.navigationButtons}>
          <TouchableOpacity
            style={UsersStyles.navButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={UsersStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}