import React, { useState } from 'react';
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
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/AppStore';
import { ProfileStyles } from '../styles/ProfileStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ onLogout }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { user, activeScreen, setActiveScreen } = useAppStore();

  // Генерация аватара на основе имени
  const getAvatarInitial = () => {
    return user?.username?.charAt(0)?.toUpperCase() || 'U';
  };

  // Информация о пользователе
  const userInfo = {
    email: `${user?.username}@cybersystem.com`,
    joinDate: '2024-01-15',
    lastLogin: 'Just now',
    accessLevel: user?.role === 'admin' ? 'Administrator' : 'Standard User',
    hooksStudied: 3,
    totalTime: '24h 18m',
    completionRate: '87%'
  };

  // Активность пользователя
  const userActivity = [
    { id: 1, icon: 'git-branch', text: 'Studied useState hook', time: '2 hours ago' },
    { id: 2, icon: 'infinite', text: 'Completed useEffect examples', time: '1 day ago' },
    { id: 3, icon: 'flash', text: 'Explored useMemo optimization', time: '3 days ago' },
    { id: 4, icon: 'person', text: 'Updated profile information', time: '1 week ago' },
  ];

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert(
      'Account Deleted',
      'Your account has been deleted successfully.',
      [{ text: 'OK', onPress: onLogout }]
    );
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

  return (
    <View style={ProfileStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={ProfileStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={ProfileStyles.scrollView}>
          {/* Header */}
          <View style={ProfileStyles.header}>
            <View style={ProfileStyles.headerCenter}>
              <View style={ProfileStyles.titleBadge}>
                <Text style={ProfileStyles.titleBadgeText}>⌗ PROFILE</Text>
              </View>
              <Text style={ProfileStyles.headerSubtitle}>USER MANAGEMENT</Text>
            </View>
          </View>

          {/* Разделительная линия */}
          <View style={ProfileStyles.cyberLine} />

          {/* Profile Header Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.profileHeader}>
                <View style={ProfileStyles.avatarContainer}>
                  <View style={ProfileStyles.avatar}>
                    <Text style={ProfileStyles.avatarText}>{getAvatarInitial()}</Text>
                    <View style={ProfileStyles.avatarStatus} />
                  </View>
                </View>
                <Text style={ProfileStyles.userName}>{user?.username}</Text>
                <Text style={ProfileStyles.userRole}>{userInfo.accessLevel}</Text>
              </View>

              <View style={ProfileStyles.infoGrid}>
                <View style={ProfileStyles.infoItem}>
                  <Text style={ProfileStyles.infoLabel}>EMAIL</Text>
                  <Text style={ProfileStyles.infoValue}>{userInfo.email}</Text>
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
                  <Text style={ProfileStyles.infoValue}>ACTIVE</Text>
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

          {/* Recent Activity Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.cardHeader}>
                <View style={ProfileStyles.cardIcon}>
                  <Ionicons name="time" size={24} color="#00d4ff" />
                </View>
                <View style={ProfileStyles.cardTitleContainer}>
                  <Text style={ProfileStyles.cardTitle}>RECENT ACTIVITY</Text>
                  <Text style={ProfileStyles.cardDescription}>Your learning journey</Text>
                </View>
              </View>

              <View style={ProfileStyles.activityContainer}>
                <View style={ProfileStyles.activityList}>
                  {userActivity.map((activity) => (
                    <View key={activity.id} style={ProfileStyles.activityItem}>
                      <View style={ProfileStyles.activityIcon}>
                        <Ionicons name={activity.icon} size={20} color="#00d4ff" />
                      </View>
                      <View style={ProfileStyles.activityContent}>
                        <Text style={ProfileStyles.activityText}>{activity.text}</Text>
                        <Text style={ProfileStyles.activityTime}>{activity.time}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Settings Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.cardHeader}>
                <View style={ProfileStyles.cardIcon}>
                  <Ionicons name="settings" size={24} color="#00d4ff" />
                </View>
                <View style={ProfileStyles.cardTitleContainer}>
                  <Text style={ProfileStyles.cardTitle}>SETTINGS</Text>
                  <Text style={ProfileStyles.cardDescription}>Customize your experience</Text>
                </View>
              </View>

              <View style={ProfileStyles.settingsContainer}>
                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLabelContainer}>
                    <Ionicons name="notifications" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingLabel}>Notifications</Text>
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
                  <View style={ProfileStyles.settingLabelContainer}>
                    <Ionicons name="moon" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingLabel}>Dark Mode</Text>
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
                  <View style={ProfileStyles.settingLabelContainer}>
                    <Ionicons name="create" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingLabel}>Edit Profile</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.settingItem}
                  onPress={handleChangePassword}
                  activeOpacity={0.7}
                >
                  <View style={ProfileStyles.settingLabelContainer}>
                    <Ionicons name="key" size={20} color="#00d4ff" style={ProfileStyles.settingIcon} />
                    <Text style={ProfileStyles.settingLabel}>Change Password</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Buttons Card */}
          <View style={ProfileStyles.cardWrapper}>
            <View style={ProfileStyles.card}>
              <View style={ProfileStyles.buttonGroup}>
                <TouchableOpacity
                  style={ProfileStyles.actionButton}
                  onPress={handleEditProfile}
                  activeOpacity={0.8}
                >
                  <Ionicons name="create" size={16} color="#00d4ff" />
                  <Text style={ProfileStyles.actionButtonText}>EDIT PROFILE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={ProfileStyles.dangerButton}
                  onPress={() => setShowLogoutModal(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="log-out" size={16} color="#ff2a6d" />
                  <Text style={ProfileStyles.dangerButtonText}>LOGOUT</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[ProfileStyles.dangerButton, { marginTop: 12 }]}
                onPress={() => setShowDeleteModal(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash" size={16} color="#ff2a6d" />
                <Text style={ProfileStyles.dangerButtonText}>DELETE ACCOUNT</Text>
              </TouchableOpacity>
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
        <View style={ProfileStyles.modalContainer}>
          <View style={ProfileStyles.modalContent}>
            <Text style={ProfileStyles.modalTitle}>LOGOUT</Text>
            <Text style={ProfileStyles.modalText}>
              Are you sure you want to logout from your account?
            </Text>
            <View style={ProfileStyles.modalButtons}>
              <TouchableOpacity
                style={[ProfileStyles.modalButton, ProfileStyles.modalButtonPrimary]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.modalButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ProfileStyles.modalButton, ProfileStyles.modalButtonDanger]}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.modalButtonTextDanger}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Модальное окно удаления аккаунта */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={ProfileStyles.modalContainer}>
          <View style={ProfileStyles.modalContent}>
            <Text style={ProfileStyles.modalTitle}>DELETE ACCOUNT</Text>
            <Text style={ProfileStyles.modalText}>
              This action cannot be undone. All your data will be permanently deleted.
            </Text>
            <View style={ProfileStyles.modalButtons}>
              <TouchableOpacity
                style={[ProfileStyles.modalButton, ProfileStyles.modalButtonPrimary]}
                onPress={() => setShowDeleteModal(false)}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.modalButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ProfileStyles.modalButton, ProfileStyles.modalButtonDanger]}
                onPress={handleDeleteAccount}
                activeOpacity={0.8}
              >
                <Text style={ProfileStyles.modalButtonTextDanger}>DELETE</Text>
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

          {/* Разделитель */}
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

          {/* Разделитель */}
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

          {/* Разделитель */}
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

          {/* Разделитель */}
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