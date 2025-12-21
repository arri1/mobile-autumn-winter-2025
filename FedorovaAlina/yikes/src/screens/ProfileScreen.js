import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
  Switch,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { ProfileStyles } from '../styles/ProfileStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { 
    user, 
    isAuthenticated, 
    logout, 
    getProfile, 
    activeScreen, 
    setActiveScreen 
  } = useAuthStore();

  // Загружаем актуальный профиль при открытии экрана
  useEffect(() => {
    if (isAuthenticated) {
      loadUserProfile();
    }
  }, [isAuthenticated]);

  const loadUserProfile = async () => {
    setLoading(true);
    await getProfile();
    setLoading(false);
  };

  // Генерация аватара на основе имени
  const getAvatarInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || 
           user?.username?.charAt(0)?.toUpperCase() || 
           'U';
  };

  // Информация о пользователе
  const userInfo = {
    email: user?.email || `${user?.username}@cybersystem.com`,
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024-01-15',
    lastLogin: 'Just now',
    accessLevel: user?.role === 'admin' ? 'Administrator' : 'Standard User',
    hooksStudied: 3,
    totalTime: '24h 18m',
    completionRate: '87%'
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Profile editing feature coming soon!',
      [{ text: 'OK' }]
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'Password change feature coming soon!',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={ProfileStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={ProfileStyles.safeArea}>
          <View style={ProfileStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
            <Text style={ProfileStyles.loadingText}>Loading profile...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={ProfileStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={ProfileStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={ProfileStyles.scrollView}>
          {/* Header */}
          <View style={ProfileStyles.header}>
            <View style={{ alignItems: 'center' }}>
              <View style={ProfileStyles.headerBadge}>
                <Text style={ProfileStyles.headerBadgeText}>⌗ PROFILE</Text>
              </View>
              <Text style={ProfileStyles.headerSubtitle}>USER MANAGEMENT</Text>
            </View>
          </View>

          {/* Разделительная линия */}
          <View style={ProfileStyles.divider} />

          {/* Profile Header Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.avatarContainer}>
                <View style={ProfileStyles.avatar}>
                  <Text style={ProfileStyles.avatarText}>
                    {getAvatarInitial()}
                  </Text>
                </View>
                <Text style={ProfileStyles.userName}>
                  {user?.name || user?.username}
                </Text>
                <Text style={ProfileStyles.userRole}>
                  {userInfo.accessLevel}
                </Text>
                {user?.id && (
                  <Text style={ProfileStyles.userId}>
                    ID: {String(user.id).slice(0, 8)}...
                  </Text>
                )}
              </View>

              <View style={ProfileStyles.infoGrid}>
                <View style={ProfileStyles.infoItem}>
                  <Text style={ProfileStyles.infoLabel}>EMAIL</Text>
                  <Text style={ProfileStyles.infoValue} numberOfLines={1}>{userInfo.email}</Text>
                </View>
                <View style={ProfileStyles.infoItem}>
                  <Text style={ProfileStyles.infoLabel}>JOIN DATE</Text>
                  <Text style={ProfileStyles.infoValue}>{userInfo.joinDate}</Text>
                </View>
                <View style={ProfileStyles.infoItem}>
                  <Text style={ProfileStyles.infoLabel}>LAST LOGIN</Text>
                  <Text style={ProfileStyles.infoValue}>{userInfo.lastLogin}</Text>
                </View>
                <View style={ProfileStyles.infoItem}>
                  <Text style={ProfileStyles.infoLabel}>STATUS</Text>
                  <Text style={ProfileStyles.statusValue}>ACTIVE</Text>
                </View>
              </View>

              <View style={ProfileStyles.statsContainer}>
                <View style={ProfileStyles.statItem}>
                  <Text style={ProfileStyles.statValue}>{userInfo.hooksStudied}</Text>
                  <Text style={ProfileStyles.statLabel}>HOOKS</Text>
                </View>
                <View style={ProfileStyles.statItem}>
                  <Text style={ProfileStyles.statValue}>{userInfo.totalTime}</Text>
                  <Text style={ProfileStyles.statLabel}>STUDY TIME</Text>
                </View>
                <View style={ProfileStyles.statItem}>
                  <Text style={ProfileStyles.statValue}>{userInfo.completionRate}</Text>
                  <Text style={ProfileStyles.statLabel}>PROGRESS</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Settings Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.sectionHeader}>
                <View style={ProfileStyles.sectionIcon}>
                  <Ionicons name="settings" size={24} color="#00d4ff" />
                </View>
                <View>
                  <Text style={ProfileStyles.sectionTitle}>SETTINGS</Text>
                  <Text style={ProfileStyles.sectionSubtitle}>Customize your experience</Text>
                </View>
              </View>

              <View style={{ marginBottom: 16 }}>
                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLeft}>
                    <Ionicons name="notifications" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingText}>Notifications</Text>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: '#2A2F3A', true: 'rgba(0, 212, 255, 0.3)' }}
                    thumbColor={notificationsEnabled ? '#00d4ff' : '#9AA4B2'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={() => setDarkModeEnabled(!darkModeEnabled)}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLeft}>
                    <Ionicons name="moon" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingText}>Dark Mode</Text>
                  </View>
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{ false: '#2A2F3A', true: 'rgba(0, 212, 255, 0.3)' }}
                    thumbColor={darkModeEnabled ? '#00d4ff' : '#9AA4B2'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={handleEditProfile}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLeft}>
                    <Ionicons name="create" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingText}>Edit Profile</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={ProfileStyles.settingArrow.color} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={handleChangePassword}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLeft}>
                    <Ionicons name="key" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingText}>Change Password</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={ProfileStyles.settingArrow.color} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Buttons Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.actionButtonsContainer}>
                <TouchableOpacity
                  style={ProfileStyles.editButton}
                  onPress={handleEditProfile}
                  activeOpacity={0.8}
                >
                  <Ionicons name="create" size={16} color="#00d4ff" />
                  <Text style={[ProfileStyles.actionButtonText, ProfileStyles.editButtonText]}>EDIT PROFILE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.logoutButton}
                  onPress={() => setShowLogoutModal(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="log-out" size={16} color="#ff2a6d" />
                  <Text style={[ProfileStyles.actionButtonText, ProfileStyles.logoutButtonText]}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Пробел для нижней навигации */}
          <View style={AppStyles.bottomSpacer}></View>
        </ScrollView>
      </SafeAreaView>

      {/* Модальное окно выхода */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={ProfileStyles.modalOverlay}>
          <View style={ProfileStyles.modalContent}>
            <Text style={ProfileStyles.modalTitle}>LOGOUT</Text>
            <Text style={ProfileStyles.modalMessage}>
              Are you sure you want to logout from your account?
            </Text>
            <View style={ProfileStyles.modalButtons}>
              <TouchableOpacity
                style={ProfileStyles.cancelButton}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ProfileStyles.confirmLogoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.confirmLogoutButtonText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Нижняя док-панель для навигации */}
      <View style={AppStyles.dockContainer}>
        <View style={AppStyles.dock}>
          {/* Главный экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('home')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="home" size={24} color={activeScreen === 'home' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'home' && AppStyles.dockTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useState экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usestate')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="git-branch" size={24} color={activeScreen === 'usestate' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usestate' && AppStyles.dockTextActive]}>
              useState
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useEffect экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('useeffect')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="infinite" size={24} color={activeScreen === 'useeffect' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'useeffect' && AppStyles.dockTextActive]}>
              useEffect
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useMemo экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usememo')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="flash" size={24} color={activeScreen === 'usememo' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usememo' && AppStyles.dockTextActive]}>
              useMemo
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* Profile экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('profile')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="person" size={24} color={activeScreen === 'profile' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'profile' && AppStyles.dockTextActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}