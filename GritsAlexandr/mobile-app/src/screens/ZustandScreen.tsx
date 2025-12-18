import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import useAuthStore from '../store/authStore';
import { createZustandStyles } from '../styles/zustandScreenStyles';

type InfoRowProps = {
  label: string;
  value: string;
  status?: 'success' | 'error' | 'neutral';
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value, status = 'neutral' }) => {
  const { theme } = useAppStore();
  const styles = createZustandStyles(theme);
  
  const getStatusColor = () => {
    switch (status) {
      case 'success': return styles.cardTitle.color;
      case 'error': return styles.errorText.color;
      default: return styles.infoValue.color;
    }
  };

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={[styles.infoValue, { color: getStatusColor() }]}>
          {value}
        </Text>
        {status === 'success' && <Text style={styles.statusIcon}> ✅</Text>}
        {status === 'error' && <Text style={styles.statusIcon}> ❌</Text>}
      </View>
    </View>
  );
};

const ZustandScreen: React.FC = () => {
  const { user, isAuthenticated, logout, isLoading, error } = useAuthStore();
  const { theme } = useAppStore();
  const styles = createZustandStyles(theme);

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
            } catch (error: any) {
              Alert.alert('Ошибка', error.message || 'Не удалось выйти');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Zustand Lab</Text>
        <Text style={styles.subtitle}>
          Управление состоянием
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>📊</Text>
          <Text style={styles.cardTitle}>Состояние</Text>
        </View>
        
        <InfoRow
          label="Аутентифицирован"
          value={isAuthenticated ? 'Да' : 'Нет'}
          status={isAuthenticated ? 'success' : 'error'}
        />

        {user && (
          <>
            <InfoRow label="ID" value={user.id} />
            <InfoRow label="Имя" value={user.name} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Роль" value={user.role} />
            {user.createdAt && (
              <InfoRow
                label="Создан"
                value={new Date(user.createdAt).toLocaleDateString('ru-RU')}
              />
            )}
          </>
        )}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={styles.title.color} />
            <Text style={styles.loadingText}>Загрузка...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>❌</Text>
            <Text style={styles.errorText}>Ошибка: {error}</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        {isAuthenticated ? (
          <TouchableOpacity
            style={[
              styles.button,
              isLoading && styles.buttonDisabled
            ]}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Выйти</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Войдите в систему
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ZustandScreen;