import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  // 1. Переносим все хуки внутрь компонента
  const router = useRouter();
  const { user, logout, isLoading } = useAuthStore();

  // 2. Переносим логику тоже внутрь, чтобы у нее был доступ к logout
  const handleLogout = async () => {
    try {
      await logout();
      // Опционально: можно добавить router.replace('/login') если после логаута нужно перекинуть на экран входа
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось выйти из аккаунта");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
      >
          <Ionicons name="log-out-outline" size={20} color={'#d61b1b'} />
          <Text style={[styles.title, { color: '#d61b1b'}]}>
              Выйти из аккаунта
          </Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.1)', 
    marginTop: 8,
    gap: 8,
  },
});