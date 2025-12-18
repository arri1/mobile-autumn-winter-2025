import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function UsersScreen() {
  const { getUsers } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const list = await getUsers();
      if (list) setUsers(list);
    };
    load();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Список пользователей</Text>

      {users.length === 0 ? (
        <Text style={styles.emptyText}>Нет данных</Text>
      ) : (
        users.map((user, index) => (
          <View key={user.id || index} style={styles.userCard}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>Email: {user.email}</Text>
            <Text style={styles.userRole}>Роль: {user.role}</Text>
            <Text style={styles.userDate}>Создан: {formatDate(user.createdAt)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  },
  userCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 15,
    color: '#777',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 14,
    color: '#999',
  },
});