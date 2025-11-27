import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import useAuthStore from '../../store/authStore';

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              Alert.alert('Информация', 'Вы вышли из системы');
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось выйти');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Профиль</Text>
        <Text style={styles.subtitle}>Информация о пользователе</Text>
      </View>

      {/* Карточка с информацией о пользователе */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Данные пользователя</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Имя:</Text>
          <Text style={styles.value}>{user?.name || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Роль:</Text>
          <Text style={[styles.value, styles.roleText]}>
            {user?.role || 'N/A'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{user?.id || 'N/A'}</Text>
        </View>
      </View>

      {/* Карточка с действиями */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Действия</Text>

        <View style={styles.buttonGroup}>
          <Button
            title="Выйти из аккаунта"
            onPress={handleLogout}
            color="#FF3B30"
            disabled={isLoading}
          />
        </View>
      </View>

      {/* Информационная карточка */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>О приложении</Text>
        <Text style={styles.infoText}>
          Это демонстрационное приложение с аутентификацией через API.
        </Text>
        <Text style={styles.infoText}>
          {'\n'}Используется:
        </Text>
        <Text style={styles.infoText}>• Zustand для управления состоянием</Text>
        <Text style={styles.infoText}>• Axios для HTTP запросов</Text>
        <Text style={styles.infoText}>• AsyncStorage для хранения токенов</Text>
        <Text style={styles.infoText}>• JWT токены для аутентификации</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#007AFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  roleText: {
    color: '#007AFF',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonGroup: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
});
