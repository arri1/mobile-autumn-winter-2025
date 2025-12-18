import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../store/authStore';
import { useAppStore } from '../store/useAppStore';
import { createLoginStyles } from '../styles/loginStyles';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { theme } = useAppStore();
  const styles = createLoginStyles(theme);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = email.length > 0 && password.length > 0;
    setIsFormValid(isValid);
  }, [email, password]);

  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      clearError();
    }
  }, [error]);

  const handleLogin = async () => {
    if (!isFormValid) return;
    
    try {
      await login({ email, password });
    } catch (error) {
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Вход в систему</Text>
          
          <Text style={styles.subtitle}>
            Добро пожаловать
          </Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={styles.subtitle.color}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor={styles.subtitle.color}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCorrect={false}
          />
          
          <TouchableOpacity
            style={[
              styles.button,
              { 
                backgroundColor: styles.button.backgroundColor,
                opacity: isFormValid ? 1 : 0.6
              }
            ]}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Войти
              </Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Нет аккаунта?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Мобильная разработка
          </Text>
          <Text style={styles.footerSubtext}>
            Демонстрационное приложение
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}