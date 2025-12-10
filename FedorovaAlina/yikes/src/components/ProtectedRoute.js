import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { ProtectedRouteStyles } from '../styles/ProtectedRouteStyles';

export default function ProtectedRoute({ children, goBack, requireAuth = true }) {
  const { isAuthenticated } = useAuthStore();

  if (requireAuth && !isAuthenticated) {
    return (
      <LinearGradient
        colors={['#0D1B2A', '#1B263B', '#2C3E50']}
        style={ProtectedRouteStyles.container}
      >
        <View style={ProtectedRouteStyles.content}>
          <View style={ProtectedRouteStyles.iconContainer}>
            <Ionicons name="lock-closed" size={64} color="#FFD700" />
          </View>
          <Text style={ProtectedRouteStyles.title}>🔐 Требуется авторизация</Text>
          <Text style={ProtectedRouteStyles.message}>
            Для доступа к этому разделу необходимо войти в систему
          </Text>
          <TouchableOpacity
            style={ProtectedRouteStyles.button}
            onPress={() => goBack?.()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#0b490fff','#35aa3dff']}
              style={ProtectedRouteStyles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="chevron-back" size={22} color="white" />
              <Text style={ProtectedRouteStyles.buttonText}>Вернуться назад</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ProtectedRouteStyles.button, ProtectedRouteStyles.loginButton]}
            onPress={() => {
              // Здесь должна быть навигация на экран авторизации
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#2166ceff', '#0d335eff']}
              style={ProtectedRouteStyles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="log-in" size={22} color="white" />
              <Text style={ProtectedRouteStyles.buttonText}>Войти в систему</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return children;
}