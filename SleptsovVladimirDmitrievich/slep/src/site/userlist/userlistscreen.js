import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../../auth/auth';

export default function UserListScreen() {
  const { 
    getUsers,
    logout,
    user: currentUser,
    isLoading,
    accessToken,
  } = useAuthStore();
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
    hasNext: false,
    hasPrev: false
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const loadUsers = async (page = 1) => {
    if (!accessToken) {
      console.error('No access token');
      return;
    }
    
    setUsersLoading(true);
    try {
      // Передаем параметры пагинации в getUsers
      const response = await getUsers({ page, limit: 10 });
      
      // response должен содержать users и pagination
      if (response && response.users) {
        if (page === 1) {
          setUsers(response.users);
          setFilteredUsers(response.users);
        } else {
          // Для бесконечной прокрутки можно объединять данные
          setUsers(prev => [...prev, ...response.users]);
          setFilteredUsers(prev => [...prev, ...response.users]);
        }
        
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        // Если структура отличается, пробуем получить данные по-другому
        console.log('Response structure:', response);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const loadMoreUsers = () => {
    if (pagination.hasNext && !usersLoading) {
      loadUsers(pagination.currentPage + 1);
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    // Здесь нужно реализовать удаление пользователя через API
    // После удаления обновляем список
    try {
      // await apiService.deleteUser(selectedUser.id);
      console.log('Delete user:', selectedUser.id);
      
      // Удаляем пользователя из локального списка
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setModalVisible(false);
      setSelectedUser(null);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getUsersStats = () => {
    return {
      total: pagination.totalCount,
      filtered: filteredUsers.length,
      showing: users.length
    };
  };

  const stats = getUsersStats();

  const theme = {
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      texthead: '#00ff00ff',
      card: '#1E1E1E',
      border: '#333333',
      button: '#00ff00ff',
      modalBackground: '#1E1E1E',
    }
  };

  const currentTheme = theme.dark;

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userEmail}>{item.email}</Text>
        {item.name && (
          <Text style={styles.userName}>Имя: {item.name}</Text>
        )}
        <Text style={styles.userId}>ID: {item.id}</Text>
        <Text style={styles.userRole}>Роль: {item.role}</Text>
        <Text style={styles.userDate}>
          Зарегистрирован: {formatDate(item.createdAt)}
        </Text>
        {currentUser && currentUser.id === item.id && (
          <Text style={styles.currentUserLabel}>(Текущий пользователь)</Text>
        )}
      </View>
      {currentUser && currentUser.id !== item.id && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item)}
          disabled={usersLoading}
        >
          <Text style={styles.deleteButtonText}>
            {usersLoading ? '...' : 'Удалить'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!usersLoading) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#00ff00ff" />
        <Text style={styles.footerText}>Загрузка...</Text>
      </View>
    );
  };

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
    statsCard: {
      backgroundColor: currentTheme.card,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    statsText: {
      fontSize: 14,
      color: currentTheme.text,
    },
    paginationInfo: {
      fontSize: 12,
      color: '#999',
      textAlign: 'center',
      marginTop: 5,
    },
    searchContainer: {
      backgroundColor: currentTheme.card,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
      overflow: 'hidden',
    },
    searchInput: {
      padding: 15,
      fontSize: 16,
      color: currentTheme.text,
    },
    list: {
      flex: 1,
    },
    userCard: {
      backgroundColor: currentTheme.card,
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    userInfo: {
      flex: 1,
    },
    userEmail: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.texthead,
      marginBottom: 4,
    },
    userName: {
      fontSize: 14,
      color: '#CCC',
      marginBottom: 2,
    },
    userId: {
      fontSize: 12,
      color: '#999',
      fontFamily: 'monospace',
      marginBottom: 2,
    },
    userRole: {
      fontSize: 12,
      color: '#4CAF50',
      marginBottom: 2,
      fontWeight: '500',
    },
    userDate: {
      fontSize: 11,
      color: '#777',
      marginBottom: 4,
    },
    currentUserLabel: {
      fontSize: 12,
      color: '#00ff00ff',
      fontStyle: 'italic',
    },
    userActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
    deleteButton: {
      backgroundColor: '#ff0000ff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      alignSelf: 'flex-end',
    },
    deleteButtonText: {
      color: '#000',
      fontSize: 12,
      fontWeight: '600',
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
    },
    button: {
      backgroundColor: '#00ff00ff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
    },
    logoutButton: {
      backgroundColor: '#ffff00ff',
    },
    buttonText: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    emptyContainer: {
      padding: 40,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#999',
      textAlign: 'center',
    },
    footerLoader: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    footerText: {
      marginLeft: 10,
      color: '#999',
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000b3',
    },
    modalContent: {
      backgroundColor: currentTheme.modalBackground,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      width: '80%',
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
    modalText: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      gap: 10,
    },
    modalButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 6,
      alignItems: 'center',
      flex: 1,
      minHeight: 40,
    },
    modalButtonClose: {
      backgroundColor: '#ffff00ff',
    },
    modalButtonDelete: {
      backgroundColor: '#ff0000ff',
    },
  });

  if (usersLoading && users.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00ff" />
        <Text style={[styles.statsText, { textAlign: 'center', marginTop: 20 }]}>
          Загрузка пользователей...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Список пользователей</Text>



      {/* Поиск */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск по email или имени..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Список пользователей */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        style={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#00ff00ff']}
          />
        }
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Пользователи не найдены' : 'Нет зарегистрированных пользователей'}
            </Text>
          </View>
        }
      />

      {/* Кнопки действий */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.button}
          onPress={onRefresh}
          disabled={refreshing || usersLoading}
        >
          <Text style={styles.buttonText}>
            {refreshing || usersLoading ? 'Обновление...' : 'Обновить'}
          </Text>
        </TouchableOpacity>
        

      </View>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Удаление пользователя</Text>
            
            <Text style={styles.modalText}>
              Вы уверены, что хотите удалить пользователя?
            </Text>
            <Text style={[styles.modalText, { fontWeight: 'bold' }]}>
              {selectedUser?.email}
            </Text>
            {selectedUser?.name && (
              <Text style={styles.modalText}>Имя: {selectedUser?.name}</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={cancelDelete}
                disabled={usersLoading}
              >
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonDelete]}
                onPress={confirmDelete}
                disabled={usersLoading}
              >
                <Text style={styles.buttonText}>
                  {usersLoading ? '...' : 'Удалить'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}