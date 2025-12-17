import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  useAuthStore  from '../../auth/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Валидация
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Введите пароль');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      Alert.alert('Ошибка', error.message || 'Не удалось войти');
    } finally {
      setIsLoading(false);
    }
  };


  const currentTheme = {
    background: '#1a1a1a',
    text: '#FFFFFF',
    card: '#2a2a2a',
    border: '#3a3a3a',
    button: '#00ff00ff',
    inputBackground: '#2a2a2a',
    placeholder: '#6b7280',
    footerText: '#9aa4b2',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: currentTheme.footerText,
      textAlign: 'center',
    },
    form: {
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: '#e6e9ef',
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      backgroundColor: currentTheme.inputBackground,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: currentTheme.text,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    loginButton: {
      backgroundColor: currentTheme.button,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    loginButtonText: {
      color: '#1a1a1a',
      fontSize: 16,
      fontWeight: '600',
    },
    demoButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: currentTheme.button,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    demoButtonText: {
      color: currentTheme.button,
      fontSize: 16,
      fontWeight: '500',
    },
    footer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    footerText: {
      color: currentTheme.footerText,
      fontSize: 16,
      marginRight: 8,
    },
    linkText: {
      color: currentTheme.button,
      fontSize: 16,
      fontWeight: '500',
      textDecorationLine: 'underline',
    },
    error: {
      color: '#ff6b6b',
      fontSize: 14,
      marginBottom: 12,
      textAlign: 'center',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Добро пожаловать</Text>
          <Text style={styles.subtitle}>Войдите в свой аккаунт</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите email"
              placeholderTextColor={currentTheme.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите пароль"
              placeholderTextColor={currentTheme.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#1a1a1a" />
            ) : (
              <Text style={styles.loginButtonText}>Войти</Text>
            )}
          </TouchableOpacity>


        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Нет аккаунта?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}