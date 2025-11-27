import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { CommonStyles, AuthStyles } from './styles';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
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

    const success = await register(email, password, name);
    if (!success) {
      Alert.alert('Ошибка', 'Не удалось создать аккаунт');
    }
  };

  const goToLogin = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={AuthStyles.scrollContent}>
          <View style={AuthStyles.header}>
            <Text style={AuthStyles.welcomeTitle}>Создать аккаунт 🚀</Text>
            <Text style={CommonStyles.subtitle}>Зарегистрируйтесь для начала работы</Text>
          </View>

          <View style={AuthStyles.form}>
            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Имя</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Введите ваше имя"
                placeholderTextColor="#C5C6C7"
                value={name}
                onChangeText={setName}
                editable={!isLoading}
              />
            </View>

            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Email</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Введите ваш email"
                placeholderTextColor="#C5C6C7"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>

            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Пароль</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Введите ваш пароль"
                placeholderTextColor="#C5C6C7"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Подтвердите пароль</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Повторите ваш пароль"
                placeholderTextColor="#C5C6C7"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[CommonStyles.primaryButton, isLoading && CommonStyles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="#0B0C10" /> : <Text style={CommonStyles.primaryButtonText}>Зарегистрироваться</Text>}
            </TouchableOpacity>

            <View style={AuthStyles.registerContainer}>
              <Text style={AuthStyles.registerText}>Уже есть аккаунт?</Text>
              <TouchableOpacity onPress={goToLogin} disabled={isLoading}>
                <Text style={AuthStyles.registerLink}> Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}