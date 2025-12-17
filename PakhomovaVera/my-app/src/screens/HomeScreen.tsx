import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/appnavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { useUserStore } from '../store/userStore'; 

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { authState, logout } = useAuth();
  const { user } = useUserStore();

  const labs = [
    {
      id: 0,
      title: authState.isAuthenticated ? ' Профиль' : ' Авторизация',
      subtitle: authState.isAuthenticated 
        ? `Вы вошли как ${user?.email}` 
        : 'Вход или регистрация в системе',
      screen: authState.isAuthenticated ? 'Home' : 'Login' as keyof RootStackParamList,
      color: authState.isAuthenticated ? '#28a745' : '#dc3545',
      icon: authState.isAuthenticated ? '👤' : '🔐',
    },
    {
      id: 1,
      title: 'Лаб. 1: UseState',
      subtitle: 'Управление состоянием компонентов',
      screen: 'Login' as keyof RootStackParamList,
      color: '#007AFF',
      icon: '🔄',
    },
    {
      id: 2,
      title: 'Лаб. 2: UseEffect', 
      subtitle: 'Загрузка данных из внешних источников',
      screen: 'Todo' as keyof RootStackParamList,
      color: '#34C759',
      icon: '📡',
    },
    {
      id: 3,
      title: 'Лаб. 3: UseMemo',
      subtitle: 'Оптимизация вычислений',
      screen: 'Advanced' as keyof RootStackParamList,
      color: '#FF9500',
      icon: '⚡',
    },
    {
      id: 6,
      title: 'Лаб. 6: Zustand',
      subtitle: 'Глобальное состояние приложения',
      screen: 'ZustandLab' as keyof RootStackParamList,
      color: '#AF52DE',
      icon: '🏪',
    },
    {
      id: 7,
      title: 'Посты',
      subtitle: 'Работа с постами через API',
      screen: 'Posts' as keyof RootStackParamList,
      color: '#FF3B30',
      icon: '📝',
    },
  ];

  const handleLabPress = (screen: keyof RootStackParamList) => {
    console.log('Навигация к:', screen);
     if (screen === 'Home' && authState.isAuthenticated) {
      // Если пользователь авторизован и нажимает на "Профиль"
      Alert.alert(
        'Выход',
        'Вы уверены, что хотите выйти?',
        [
          { text: 'Отмена', style: 'cancel' },
          { 
            text: 'Выйти', 
            style: 'destructive',
            onPress: () => {
              logout();
              Alert.alert('Успешно', 'Вы вышли из системы');
            }
          }
        ]
      );
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.mainTitle}>React Native Лабораторные</Text>
        <Text style={styles.subtitle}>Выберите лабораторную работу:</Text>

         <View style={[
          styles.infoBox, 
          { 
            backgroundColor: authState.isAuthenticated ? '#d4edda' : '#f8d7da',
            borderLeftColor: authState.isAuthenticated ? '#28a745' : '#dc3545'
          }
        ]}>
          <Text style={styles.infoTitle}>
            {authState.isAuthenticated ? 'Вы авторизованы' : ' Требуется авторизация'}
          </Text>
          <Text style={styles.infoText}>
            {authState.isAuthenticated 
              ? `Вы вошли как: ${user?.email}`
              : 'Для доступа к некоторым функциям требуется войти в систему'
            }
           </Text>
          {authState.isAuthenticated && user?.name && (
            <Text style={styles.infoText}>
              Имя: <Text style={styles.userName}>{user.name}</Text>
            </Text>
          )}
          {authState.isAuthenticated && !user?.name && (
            <Text style={[styles.infoText, styles.warningText]}>
              Имя не указано. Вы можете добавить его в профиле.
            </Text>
          )}
        </View>

        {labs.map((lab) => (
          <TouchableOpacity
            key={lab.id}
            style={[styles.labCard, { borderLeftColor: lab.color }]}
            onPress={() => handleLabPress(lab.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <Text style={styles.icon}>{lab.icon}</Text>
              <View style={styles.labInfo}>
                <Text style={styles.labTitle}>{lab.title}</Text>
                <Text style={styles.labSubtitle}>{lab.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  labCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 15,
  },
  labInfo: {
    flex: 1,
  },
  labTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#e7f3ff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  debugInfo: {
    backgroundColor: '#fff3cd',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  userName: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  warningText: {
    color: '#856404',
    fontStyle: 'italic',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#856404',
  },
  debugText: {
    fontSize: 12,
    color: '#856404',
    marginBottom: 4,
  },
});