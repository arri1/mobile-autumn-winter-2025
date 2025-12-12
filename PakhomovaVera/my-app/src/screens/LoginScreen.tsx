import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

export const LoginScreen1: React.FC = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const result = await login(formData.email, formData.password);

    if (result.success) {
      Alert.alert(
        'Успешный вход',
        'Добро пожаловать!',
        [{ text: 'OK', onPress: () => navigation.navigate('Home' as never) }]
      );
    } else {
      Alert.alert('Ошибка входа', result.error || 'Неизвестная ошибка');
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegisterNavigation = () => {
    console.log('Навигация к регистрации');
    navigation.navigate('Register' as never);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Вход в систему</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Введите ваш email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Пароль</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Введите ваш пароль"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Войти</Text>
            )}
          </TouchableOpacity>

          {/* Кнопка перехода к регистрации */}
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleRegisterNavigation}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Кнопка регистрации
  registerButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#28a745',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Разделительная линия
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLinkText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoSection: {
    backgroundColor: '#e7f3ff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  // Секция быстрых действий
  quickActions: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  quickActionsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  demoButton: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107',
  },
  quickActionButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});