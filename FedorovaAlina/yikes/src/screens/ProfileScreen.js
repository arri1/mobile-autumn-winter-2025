import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen({ goBack }) {
  const { user, logout, updateProfile, isAdmin } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleLogout = () => {
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
            goBack();
          }
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    if (editedName.trim()) {
      updateProfile(editedName.trim());
      setIsEditing(false);
      Alert.alert('Успех', 'Профиль обновлен!');
    }
  };

  const getRoleText = (role) => {
    switch(role) {
      case 'admin': return '🎅 Администратор';
      case 'user': return '🎁 Пользователь';
      default: return '👤 Гость';
    }
  };

  return (
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <View style={styles.titleBadge}>
                <Text style={styles.titleBadgeText}>👤 Профиль</Text>
              </View>
              <Text style={styles.headerSubtitle}>Личный кабинет</Text>
            </View>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Декоративные снежинки */}
          <View style={styles.snowflakeContainer}>
            <Text style={styles.snowflake}>❄️</Text>
            <Text style={[styles.snowflake, styles.snowflake2]}>❄️</Text>
            <Text style={[styles.snowflake, styles.snowflake3]}>❄️</Text>
          </View>

          {/* Профиль пользователя */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{user?.avatar || '👤'}</Text>
                  {isAdmin() && (
                    <View style={styles.adminBadge}>
                      <Ionicons name="shield" size={16} color="white" />
                    </View>
                  )}
                </View>
                <View style={styles.profileInfo}>
                  {isEditing ? (
                    <View style={styles.editContainer}>
                      <TextInput
                        style={styles.editInput}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Введите имя"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      />
                    </View>
                  ) : (
                    <Text style={styles.profileName}>{user?.name || 'Пользователь'}</Text>
                  )}
                  <Text style={styles.profileRole}>
                    {getRoleText(user?.role)}
                  </Text>
                  <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
                </View>
              </View>

              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>🎄</Text>
                  <Text style={styles.statLabel}>Уровень</Text>
                  <Text style={styles.statNumber}>1</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>⭐</Text>
                  <Text style={styles.statLabel}>Опыт</Text>
                  <Text style={styles.statNumber}>100</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>🏆</Text>
                  <Text style={styles.statLabel}>Достижения</Text>
                  <Text style={styles.statNumber}>3</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Действия профиля */}
          <View style={styles.actionsCard}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={styles.actionsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.sectionTitle}>Действия</Text>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsEditing(!isEditing)}
                activeOpacity={0.7}
              >
                <View style={styles.actionContent}>
                  <Ionicons name="create" size={22} color="#FFD700" />
                  <Text style={styles.actionText}>
                    {isEditing ? 'Отменить редактирование' : 'Редактировать профиль'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={handleSaveProfile}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionContent}>
                    <Ionicons name="save" size={22} color="#FFD700" />
                    <Text style={styles.actionText}>Сохранить изменения</Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => Alert.alert('Настройки', 'Раздел в разработке')}
                activeOpacity={0.7}
              >
                <View style={styles.actionContent}>
                  <Ionicons name="settings" size={22} color="#FFD700" />
                  <Text style={styles.actionText}>Настройки</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => Alert.alert('Статистика', 'Раздел в разработке')}
                activeOpacity={0.7}
              >
                <View style={styles.actionContent}>
                  <Ionicons name="stats-chart" size={22} color="#FFD700" />
                  <Text style={styles.actionText}>Статистика</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Админ панель (только для админов) */}
          {isAdmin() && (
            <View style={styles.adminCard}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={styles.adminGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.adminHeader}>
                  <Ionicons name="shield" size={28} color="#FFD700" />
                  <Text style={styles.adminTitle}>Панель администратора</Text>
                </View>
                
                <View style={styles.adminActions}>
                  <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => Alert.alert('Пользователи', 'Управление пользователями')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="people" size={20} color="white" />
                    <Text style={styles.adminButtonText}>Пользователи</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => Alert.alert('Статистика', 'Статистика приложения')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="analytics" size={20} color="white" />
                    <Text style={styles.adminButtonText}>Аналитика</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.adminButton}
                    onPress={() => Alert.alert('Настройки', 'Настройки системы')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cog" size={20} color="white" />
                    <Text style={styles.adminButtonText}>Система</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Кнопка выхода */}
          <View style={styles.logoutCard}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={styles.logoutGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="log-out" size={22} color="white" />
                <Text style={styles.logoutText}>Выйти из аккаунта</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Информация о приложении */}
          <View style={styles.infoCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={styles.infoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.infoTitle}>Информация о приложении</Text>
              <Text style={styles.infoText}>
                Приложение "React Hooks Demo" - учебный проект для изучения хуков React
              </Text>
              <Text style={styles.versionText}>Версия 1.0.0</Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerCenter: {
    alignItems: 'center',
  },
  titleBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 6,
  },
  titleBadgeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#81D4FA',
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 70,
  },
  snowflakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginVertical: 10,
    opacity: 0.6,
  },
  snowflake: {
    fontSize: 22,
  },
  snowflake2: {
    fontSize: 18,
  },
  snowflake3: {
    fontSize: 26,
  },
  profileCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    fontSize: 64,
  },
  adminBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D1B2A',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  editContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editInput: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  actionsCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionsGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  adminCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  adminGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  adminActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adminButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  adminButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 8,
  },
  logoutCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoGradient: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoTitle: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    lineHeight: 16,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    fontStyle: 'italic',
  },
});