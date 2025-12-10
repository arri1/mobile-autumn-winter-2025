import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children, goBack, requireAuth = true }) {
  const { isAuthenticated } = useAuthStore();

  if (requireAuth && !isAuthenticated) {
    return (
      <LinearGradient
        colors={['#0D1B2A', '#1B263B', '#2C3E50']}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={64} color="#FFD700" />
          </View>
          <Text style={styles.title}>🔐 Требуется авторизация</Text>
          <Text style={styles.message}>
            Для доступа к этому разделу необходимо войти в систему
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goBack?.()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#0b490fff','#35aa3dff']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="chevron-back" size={22} color="white" />
              <Text style={styles.buttonText}>Вернуться назад</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => {
              // Здесь должна быть навигация на экран авторизации
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2166ceff', '#0d335eff']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="log-in" size={22} color="white" />
              <Text style={styles.buttonText}>Войти в систему</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loginButton: {
    marginTop: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});