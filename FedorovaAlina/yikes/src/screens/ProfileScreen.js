import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { ProfileScreenStyles } from '../styles/ProfileScreenStyles';

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
      style={ProfileScreenStyles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={ProfileScreenStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={ProfileScreenStyles.header}>
            <TouchableOpacity 
              style={ProfileScreenStyles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={ProfileScreenStyles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={ProfileScreenStyles.headerCenter}>
              <View style={ProfileScreenStyles.titleBadge}>
                <Text style={ProfileScreenStyles.titleBadgeText}>👤 Профиль</Text>
              </View>
              <Text style={ProfileScreenStyles.headerSubtitle}>Личный кабинет</Text>
            </View>
            <View style={ProfileScreenStyles.headerPlaceholder} />
          </View>

          {/* Декоративные снежинки */}
          <View style={ProfileScreenStyles.snowflakeContainer}>
            <Text style={ProfileScreenStyles.snowflake}>❄️</Text>
            <Text style={[ProfileScreenStyles.snowflake, ProfileScreenStyles.snowflake2]}>❄️</Text>
            <Text style={[ProfileScreenStyles.snowflake, ProfileScreenStyles.snowflake3]}>❄️</Text>
          </View>

          {/* Профиль пользователя */}
          <View style={ProfileScreenStyles.profileCard}>
            <LinearGradient
              colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
              style={ProfileScreenStyles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={ProfileScreenStyles.profileHeader}>
                <View style={ProfileScreenStyles.avatarContainer}>
                  <Text style={ProfileScreenStyles.avatar}>{user?.avatar || '👤'}</Text>
                  {isAdmin() && (
                    <View style={ProfileScreenStyles.adminBadge}>
                      <Ionicons name="shield" size={16} color="white" />
                    </View>
                  )}
                </View>
                <View style={ProfileScreenStyles.profileInfo}>
                  {isEditing ? (
                    <View style={ProfileScreenStyles.editContainer}>
                      <TextInput
                        style={ProfileScreenStyles.editInput}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Введите имя"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      />
                    </View>
                  ) : (
                    <Text style={ProfileScreenStyles.profileName}>{user?.name || 'Пользователь'}</Text>
                  )}
                  <Text style={ProfileScreenStyles.profileRole}>
                    {getRoleText(user?.role)}
                  </Text>
                  <Text style={ProfileScreenStyles.profileEmail}>{user?.email || 'email@example.com'}</Text>
                </View>
              </View>

              <View style={ProfileScreenStyles.profileStats}>
                <View style={ProfileScreenStyles.statItem}>
                  <Text style={ProfileScreenStyles.statValue}>🎄</Text>
                  <Text style={ProfileScreenStyles.statLabel}>Уровень</Text>
                  <Text style={ProfileScreenStyles.statNumber}>1</Text>
                </View>
                <View style={ProfileScreenStyles.statItem}>
                  <Text style={ProfileScreenStyles.statValue}>⭐</Text>
                  <Text style={ProfileScreenStyles.statLabel}>Опыт</Text>
                  <Text style={ProfileScreenStyles.statNumber}>100</Text>
                </View>
                <View style={ProfileScreenStyles.statItem}>
                  <Text style={ProfileScreenStyles.statValue}>🏆</Text>
                  <Text style={ProfileScreenStyles.statLabel}>Достижения</Text>
                  <Text style={ProfileScreenStyles.statNumber}>3</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Действия профиля */}
          <View style={ProfileScreenStyles.actionsCard}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={ProfileScreenStyles.actionsGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={ProfileScreenStyles.sectionTitle}>Действия</Text>
              
              <TouchableOpacity
                style={ProfileScreenStyles.actionButton}
                onPress={() => setIsEditing(!isEditing)}
                activeOpacity={0.7}
              >
                <View style={ProfileScreenStyles.actionContent}>
                  <Ionicons name="create" size={22} color="#FFD700" />
                  <Text style={ProfileScreenStyles.actionText}>
                    {isEditing ? 'Отменить редактирование' : 'Редактировать профиль'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>

              {isEditing && (
                <TouchableOpacity
                  style={[ProfileScreenStyles.actionButton, ProfileScreenStyles.saveButton]}
                  onPress={handleSaveProfile}
                  activeOpacity={0.7}
                >
                  <View style={ProfileScreenStyles.actionContent}>
                    <Ionicons name="save" size={22} color="#FFD700" />
                    <Text style={ProfileScreenStyles.actionText}>Сохранить изменения</Text>
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={ProfileScreenStyles.actionButton}
                onPress={() => Alert.alert('Настройки', 'Раздел в разработке')}
                activeOpacity={0.7}
              >
                <View style={ProfileScreenStyles.actionContent}>
                  <Ionicons name="settings" size={22} color="#FFD700" />
                  <Text style={ProfileScreenStyles.actionText}>Настройки</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>

              <TouchableOpacity
                style={ProfileScreenStyles.actionButton}
                onPress={() => Alert.alert('Статистика', 'Раздел в разработке')}
                activeOpacity={0.7}
              >
                <View style={ProfileScreenStyles.actionContent}>
                  <Ionicons name="stats-chart" size={22} color="#FFD700" />
                  <Text style={ProfileScreenStyles.actionText}>Статистика</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Админ панель (только для админов) */}
          {isAdmin() && (
            <View style={ProfileScreenStyles.adminCard}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={ProfileScreenStyles.adminGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={ProfileScreenStyles.adminHeader}>
                  <Ionicons name="shield" size={28} color="#FFD700" />
                  <Text style={ProfileScreenStyles.adminTitle}>Панель администратора</Text>
                </View>
                
                <View style={ProfileScreenStyles.adminActions}>
                  <TouchableOpacity
                    style={ProfileScreenStyles.adminButton}
                    onPress={() => Alert.alert('Пользователи', 'Управление пользователями')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="people" size={20} color="white" />
                    <Text style={ProfileScreenStyles.adminButtonText}>Пользователи</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={ProfileScreenStyles.adminButton}
                    onPress={() => Alert.alert('Статистика', 'Статистика приложения')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="analytics" size={20} color="white" />
                    <Text style={ProfileScreenStyles.adminButtonText}>Аналитика</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={ProfileScreenStyles.adminButton}
                    onPress={() => Alert.alert('Настройки', 'Настройки системы')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cog" size={20} color="white" />
                    <Text style={ProfileScreenStyles.adminButtonText}>Система</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Кнопка выхода */}
          <View style={ProfileScreenStyles.logoutCard}>
            <TouchableOpacity
              style={ProfileScreenStyles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={ProfileScreenStyles.logoutGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="log-out" size={22} color="white" />
                <Text style={ProfileScreenStyles.logoutText}>Выйти из аккаунта</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Информация о приложении */}
          <View style={ProfileScreenStyles.infoCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
              style={ProfileScreenStyles.infoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={ProfileScreenStyles.infoTitle}>Информация о приложении</Text>
              <Text style={ProfileScreenStyles.infoText}>
                Приложение "React Hooks Demo" - учебный проект для изучения хуков React
              </Text>
              <Text style={ProfileScreenStyles.versionText}>Версия 1.0.0</Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}