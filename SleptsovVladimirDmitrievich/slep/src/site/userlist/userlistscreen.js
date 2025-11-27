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
import { useAuthStore } from '../../auth/auth';

export default function UserListScreen() {
  const { 
    users, 
    loadUsers, 
    deleteUser, 
    searchUsers, 
    getUsersStats,
    isUsersLoading,
    isLoading,
    logout,
    user: currentUser 
  } = useAuthStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      setModalVisible(false);
      setSelectedUser(null);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const filteredUsers = searchUsers(searchQuery);
  const stats = getUsersStats();

  const theme = {
    dark: {
      background: '#121212',
      text: '#FFFFFF',
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
        <Text style={styles.userId}>ID: {item.id}</Text>
        {currentUser && currentUser.id === item.id && (
          <Text style={styles.currentUserLabel}>(Текущий пользователь)</Text>
        )}
      </View>
      {currentUser && currentUser.id !== item.id && (
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteUser(item)}
          disabled={isUsersLoading}
        >
          <Text style={styles.deleteButtonText}>
            {isUsersLoading ? '...' : 'Удалить'}
          </Text>
        </TouchableOpacity>
      )}
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
    statsCard: {
      backgroundColor: currentTheme.card,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    statsText: {
      fontSize: 16,
      color: currentTheme.text,
      textAlign: 'center',
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      color: currentTheme.text,
      marginBottom: 4,
    },
    userId: {
      fontSize: 12,
      color: '#999',
      fontFamily: 'monospace',
      marginBottom: 2,
    },
    currentUserLabel: {
      fontSize: 12,
      color: '#00ff00ff',
      fontStyle: 'italic',
    },
    deleteButton: {
      backgroundColor: '#ff0000ff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
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

  if (isUsersLoading && users.length === 0) {
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

      {/* Статистика */}
      <View style={styles.statsCard}>
        <Text style={styles.statsText}>
          Всего пользователей: {stats.total}
        </Text>
        <Text style={styles.statsText}>
          Найдено: {filteredUsers.length}
        </Text>
      </View>

      {/* Поиск */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск по email..."
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
        keyExtractor={(item) => item.id}
        style={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#00ff00ff']}
          />
        }
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
          disabled={refreshing || isUsersLoading}
        >
          <Text style={styles.buttonText}>
            {refreshing || isUsersLoading ? 'Обновление...' : 'Обновить'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '...' : 'Выйти'}
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
            <Text style={styles.modalText}>
              {selectedUser?.email}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={cancelDelete}
                disabled={isUsersLoading}
              >
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonDelete]}
                onPress={confirmDelete}
                disabled={isUsersLoading}
              >
                <Text style={styles.buttonText}>
                  {isUsersLoading ? '...' : 'Удалить'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}