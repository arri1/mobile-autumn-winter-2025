import React, {  useEffect } from 'react';
import {  View,  Text,  TouchableOpacity,  SafeAreaView,  ScrollView,} from 'react-native';
import { useAuthStore } from '../store/authStore';

const ProfileScreen = ({ navigation }) => {
  const { user, logout, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleRefreshProfile = async () => {
    await getProfile();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          <Text style={styles.subtitle}>Ваша информация</Text>
        </View>

        {/* Карточка пользователя */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Пользователь'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Нет email'}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID пользователя:</Text>
              <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Статус:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Активен</Text>
              </View>
            </View>
          </View>
        </View>

        

        {/* Кнопка выхода */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Выйти из аккаунта</Text>
        </TouchableOpacity>

      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 25,
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3436',
    fontFamily: 'monospace',
  },
  statusBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    color: '#155724',
    fontWeight: '600',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 30,
    overflow: 'hidden',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
  },
  menuItemText: {
    fontSize: 16,
    color: '#2d3436',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 12,
    color: '#b2bec3',
  },
};

export default ProfileScreen;