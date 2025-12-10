import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { AuthScreenStyles } from '../styles/AuthScreenStyles';

export default function AuthScreen({ goBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, register, isLoading, error, clearError, isAuthenticated, user } = useAuthStore();
  
  // Автоматическое заполнение демо-данных
  useEffect(() => {
    if (isLogin) {
      setEmail('santa@northpole.com');
      setPassword('123456');
    }
  }, [isLogin]);
  
  const handleSubmit = async () => {
    clearError();
    
    if (!email || !password) {
      useAuthStore.setState({ error: 'Заполните все поля' });
      return;
    }
    
    if (!isLogin && !name) {
      useAuthStore.setState({ error: 'Введите имя' });
      return;
    }
    
    let result;
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUsers = [
        { id: 1, email: 'santa@northpole.com', password: '123456', name: 'Санта Клаус', role: 'admin' },
        { id: 2, email: 'snowman@winter.com', password: '123456', name: 'Снеговик Олаф', role: 'user' },
        { id: 3, email: 'guest@newyear.com', password: '123456', name: 'Новогодний Гость', role: 'user' },
      ];
      
      const user = demoUsers.find(
        user => user.email === email && user.password === password
      );
      
      if (user) {
        if (isLogin) {
          result = await login(email, password);
        } else {
          result = await register(name, email, password);
        }
        
        return result;
      } else {
        useAuthStore.setState({
          isLoading: false,
          error: 'Неверный email или пароль'
        });
        return { success: false, error: 'Неверный email или пароль' };
      }
    } catch (error) {
      useAuthStore.setState({
        isLoading: false,
        error: 'Ошибка сервера. Попробуйте позже.'
      });
      return { success: false, error: 'Ошибка сервера' };
    }
  };
  
  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    login(demoEmail, demoPassword);
  };

  return (
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={AuthScreenStyles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={AuthScreenStyles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={AuthScreenStyles.keyboardAvoid}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={AuthScreenStyles.header}>
              {/* <TouchableOpacity 
                style={AuthScreenStyles.backButton} 
                onPress={goBack}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={AuthScreenStyles.backButtonText}>Назад</Text>
              </TouchableOpacity> */}
              <View style={AuthScreenStyles.headerCenter}>
                <View style={AuthScreenStyles.titleBadge}>
                  <Text style={AuthScreenStyles.titleBadgeText}>🔐 Авторизация</Text>
                </View>
                <Text style={AuthScreenStyles.headerSubtitle}>
                  {isLogin ? 'Вход в праздничное приложение' : 'Регистрация нового гостя'}
                </Text>
              </View>
              <View style={AuthScreenStyles.headerPlaceholder} />
            </View>

            {/* Декоративные снежинки */}
            <View style={AuthScreenStyles.snowflakeContainer}>
              <Text style={AuthScreenStyles.snowflake}>❄️</Text>
              <Text style={[AuthScreenStyles.snowflake, AuthScreenStyles.snowflake2]}>❄️</Text>
              <Text style={[AuthScreenStyles.snowflake, AuthScreenStyles.snowflake3]}>❄️</Text>
            </View>

            {/* Приветствие */}
            <View style={AuthScreenStyles.welcomeCard}>
              <LinearGradient
                colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
                style={AuthScreenStyles.welcomeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AuthScreenStyles.welcomeHeader}>
                  <Text style={AuthScreenStyles.welcomeEmoji}>{isLogin ? '🎅' : '🎁'}</Text>
                  <View>
                    <Text style={AuthScreenStyles.welcomeTitle}>
                      {isLogin ? 'Добро пожаловать!' : 'Присоединяйтесь!'}
                    </Text>
                    <Text style={AuthScreenStyles.welcomeSubtitle}>
                      {isLogin 
                        ? 'Войдите в праздничное приложение' 
                        : 'Создайте аккаунт для доступа ко всем функциям'}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Форма */}
            <View style={AuthScreenStyles.formCard}>
              <LinearGradient
                colors={['#0b490fff','#35aa3dff', '#2E8B57']}
                style={AuthScreenStyles.formGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Переключение между входом и регистрацией */}
                <View style={AuthScreenStyles.toggleContainer}>
                  <TouchableOpacity
                    style={[AuthScreenStyles.toggleButton, isLogin && AuthScreenStyles.toggleActive]}
                    onPress={() => {
                      setIsLogin(true);
                      clearError();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[AuthScreenStyles.toggleText, isLogin && AuthScreenStyles.toggleTextActive]}>
                      Вход
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[AuthScreenStyles.toggleButton, !isLogin && AuthScreenStyles.toggleActive]}
                    onPress={() => {
                      setIsLogin(false);
                      clearError();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[AuthScreenStyles.toggleText, !isLogin && AuthScreenStyles.toggleTextActive]}>
                      Регистрация
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Поля формы */}
                {!isLogin && (
                  <View style={AuthScreenStyles.inputContainer}>
                    <View style={AuthScreenStyles.inputIcon}>
                      <Ionicons name="person" size={20} color="#FFD700" />
                    </View>
                    <TextInput
                      style={AuthScreenStyles.input}
                      placeholder="Ваше имя"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                )}

                <View style={AuthScreenStyles.inputContainer}>
                  <View style={AuthScreenStyles.inputIcon}>
                    <Ionicons name="mail" size={20} color="#FFD700" />
                  </View>
                  <TextInput
                    style={AuthScreenStyles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={AuthScreenStyles.inputContainer}>
                  <View style={AuthScreenStyles.inputIcon}>
                    <Ionicons name="lock-closed" size={20} color="#FFD700" />
                  </View>
                  <TextInput
                    style={[AuthScreenStyles.input, AuthScreenStyles.passwordInput]}
                    placeholder="Пароль"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={AuthScreenStyles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={22} 
                      color="#FFD700" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Ошибка */}
                {error && (
                  <View style={AuthScreenStyles.errorContainer}>
                    <Ionicons name="warning" size={20} color="#FF6B6B" />
                    <Text style={AuthScreenStyles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Кнопка отправки */}
                <TouchableOpacity
                  style={AuthScreenStyles.submitButton}
                  onPress={handleSubmit}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFC107']}
                    style={AuthScreenStyles.submitGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#0D1B2A" />
                    ) : (
                      <>
                        <Ionicons 
                          name={isLogin ? "log-in" : "person-add"} 
                          size={22} 
                          color="#0D1B2A" 
                        />
                        <Text style={AuthScreenStyles.submitText}>
                          {isLogin ? 'Войти в приложение' : 'Создать аккаунт'}
                        </Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Быстрый вход (демо-пользователи) */}
                <View style={AuthScreenStyles.demoSection}>
                  <Text style={AuthScreenStyles.demoTitle}>Быстрый вход:</Text>
                  <View style={AuthScreenStyles.demoButtons}>
                    <TouchableOpacity
                      style={AuthScreenStyles.demoButton}
                      onPress={() => handleDemoLogin('santa@northpole.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={AuthScreenStyles.demoEmoji}>🎅</Text>
                      <Text style={AuthScreenStyles.demoText}>Санта</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={AuthScreenStyles.demoButton}
                      onPress={() => handleDemoLogin('snowman@winter.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={AuthScreenStyles.demoEmoji}>⛄</Text>
                      <Text style={AuthScreenStyles.demoText}>Олаф</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={AuthScreenStyles.demoButton}
                      onPress={() => handleDemoLogin('guest@newyear.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={AuthScreenStyles.demoEmoji}>🎁</Text>
                      <Text style={AuthScreenStyles.demoText}>Гость</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Информационная карточка */}
            <View style={AuthScreenStyles.infoCard}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={AuthScreenStyles.infoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AuthScreenStyles.infoHeader}>
                  <Ionicons name="information-circle" size={28} color="#FFD700" />
                  <Text style={AuthScreenStyles.infoTitle}>Преимущества аккаунта</Text>
                </View>
                <View style={AuthScreenStyles.infoList}>
                  <View style={AuthScreenStyles.infoItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={AuthScreenStyles.infoText}>Сохранение прогресса</Text>
                  </View>
                  <View style={AuthScreenStyles.infoItem}>
                    <Ionicons name="gift" size={16} color="#FFD700" />
                    <Text style={AuthScreenStyles.infoText}>Дополнительные функции</Text>
                  </View>
                  <View style={AuthScreenStyles.infoItem}>
                    <Ionicons name="cloud" size={16} color="#FFD700" />
                    <Text style={AuthScreenStyles.infoText}>Синхронизация между устройствами</Text>
                  </View>
                  <View style={AuthScreenStyles.infoItem}>
                    <Ionicons name="settings" size={16} color="#FFD700" />
                    <Text style={AuthScreenStyles.infoText}>Персональные настройки</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}