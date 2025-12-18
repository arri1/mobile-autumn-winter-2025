import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { RegisterStyles } from './RegisterScreenStyle';
import { useAuth } from '../../contexts/AuthContext'; 

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const { register, isLoading, error, clearError } = useAuth(); 

  React.useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      clearError();
    }
  }, [error, clearError]);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Заполните все обязательные поля');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      const success = await register(email, password, username || undefined);
      if (success) {
        Alert.alert('Успех', 'Регистрация завершена!');
      } else {
        Alert.alert('Ошибка', 'Не удалось зарегистрироваться');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={RegisterStyles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={RegisterStyles.scrollContent}>
            <View style={RegisterStyles.header}>
              <Text style={RegisterStyles.title}>Создать аккаунт 🚀</Text>
            </View>

            <View style={RegisterStyles.form}>
              <View style={RegisterStyles.inputContainer}>
                <Text style={RegisterStyles.label}>Имя пользователя (опционально)</Text>
                <TextInput
                  style={RegisterStyles.input}
                  placeholder="Введите имя пользователя"
                  placeholderTextColor="#C5C6C7"
                  value={username}
                  onChangeText={setUsername}
                  editable={!isLoading}
                  maxLength={50}
                />
              </View>

              <View style={RegisterStyles.inputContainer}>
                <Text style={RegisterStyles.label}>Email *</Text>
                <TextInput
                  style={RegisterStyles.input}
                  placeholder="Введите ваш email"
                  placeholderTextColor="#C5C6C7"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!isLoading}
                />
              </View>

              <View style={RegisterStyles.inputContainer}>
                <Text style={RegisterStyles.label}>Пароль *</Text>
                <TextInput
                  style={RegisterStyles.input}
                  placeholder="Введите пароль (минимум 6 символов)"
                  placeholderTextColor="#C5C6C7"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
              </View>

              <View style={RegisterStyles.inputContainer}>
                <Text style={RegisterStyles.label}>Подтвердите пароль *</Text>
                <TextInput
                  style={RegisterStyles.input}
                  placeholder="Повторите пароль"
                  placeholderTextColor="#C5C6C7"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!isLoading}
                />
              </View>

              <TouchableOpacity
                style={[RegisterStyles.registerButton, isLoading && RegisterStyles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#0B0C10" />
                ) : (
                  <Text style={RegisterStyles.registerButtonText}>Зарегистрироваться</Text>
                )}
              </TouchableOpacity>

              <View style={RegisterStyles.loginContainer}>
                <Text style={RegisterStyles.loginText}>Уже есть аккаунт?</Text>
                <TouchableOpacity onPress={goToLogin} disabled={isLoading}>
                  <Text style={RegisterStyles.loginLink}> Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}