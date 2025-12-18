import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function ProfileScreen() {
  const { currentUser, getProfile, logout } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы действительно хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Имя:</Text>
        <Text style={styles.value}>{currentUser?.name || '—'}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{currentUser?.email || '—'}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Роль:</Text>
        <Text style={styles.value}>{currentUser?.role || '—'}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Создан:</Text>
        <Text style={styles.value}>{formatDate(currentUser?.createdAt)}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.label}>Обновлён:</Text>
        <Text style={styles.value}>{formatDate(currentUser?.updatedAt)}</Text>
      </View>

      <View style={styles.spacer} />

      <Button title="Выйти из аккаунта" onPress={handleLogout} color="#d32f2f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  spacer: {
    height: 40,
  },
});