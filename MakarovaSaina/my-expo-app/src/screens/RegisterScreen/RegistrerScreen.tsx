import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RegisterStyles } from './RegisterScreenStyle';
import { useAuthStore } from '../../backend/auth'; 
import { RootStackParamList } from '../../navigation/types'; 

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
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
      await register({ email, password });
    } catch (error: any) {
      Alert.alert('Ошибка', error.message || 'Не удалось создать аккаунт');
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={RegisterStyles.safeArea}>
      <KeyboardAvoidingView
        style={RegisterStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={RegisterStyles.scrollContent}>
          <View style={RegisterStyles.header}>
            <Text style={RegisterStyles.title}>Создать аккаунт 🚀</Text>
          </View>

          <View style={RegisterStyles.form}>
            <View style={RegisterStyles.inputContainer}>
              <Text style={RegisterStyles.label}>Email</Text> 
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
              <Text style={RegisterStyles.label}>Пароль</Text>
              <TextInput
                style={RegisterStyles.input}
                placeholder="Введите ваш пароль"
                placeholderTextColor="#C5C6C7"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <View style={RegisterStyles.inputContainer}>
              <Text style={RegisterStyles.label}>Подтвердите пароль</Text>
              <TextInput
                style={RegisterStyles.input}
                placeholder="Повторите ваш пароль"
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
  );
}