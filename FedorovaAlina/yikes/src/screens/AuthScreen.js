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
    
    const user = demoUsers.find(
      user => user.email === email && user.password === password
    );
    
    if (user) {
      const token = `jwt_token_${Date.now()}`;
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.role === 'admin' ? '🎅' : '⛄'
      };
      
      // Используйте login или register из store
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
      }
      
      // Если авторизация успешна и есть onSuccess - вызываем
      if (result?.success && onSuccess) {
        onSuccess();
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
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={goBack}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={styles.backButtonText}>Назад</Text>
              </TouchableOpacity>
              <View style={styles.headerCenter}>
                <View style={styles.titleBadge}>
                  <Text style={styles.titleBadgeText}>🔐 Авторизация</Text>
                </View>
                <Text style={styles.headerSubtitle}>
                  {isLogin ? 'Вход в праздничное приложение' : 'Регистрация нового гостя'}
                </Text>
              </View>
              <View style={styles.headerPlaceholder} />
            </View>

            {/* Декоративные снежинки */}
            <View style={styles.snowflakeContainer}>
              <Text style={styles.snowflake}>❄️</Text>
              <Text style={[styles.snowflake, styles.snowflake2]}>❄️</Text>
              <Text style={[styles.snowflake, styles.snowflake3]}>❄️</Text>
            </View>

            {/* Приветствие */}
            <View style={styles.welcomeCard}>
              <LinearGradient
                colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
                style={styles.welcomeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.welcomeHeader}>
                  <Text style={styles.welcomeEmoji}>{isLogin ? '🎅' : '🎁'}</Text>
                  <View>
                    <Text style={styles.welcomeTitle}>
                      {isLogin ? 'Добро пожаловать!' : 'Присоединяйтесь!'}
                    </Text>
                    <Text style={styles.welcomeSubtitle}>
                      {isLogin 
                        ? 'Войдите в праздничное приложение' 
                        : 'Создайте аккаунт для доступа ко всем функциям'}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Форма */}
            <View style={styles.formCard}>
              <LinearGradient
                colors={['#0b490fff','#35aa3dff', '#2E8B57']}
                style={styles.formGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Переключение между входом и регистрацией */}
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[styles.toggleButton, isLogin && styles.toggleActive]}
                    onPress={() => {
                      setIsLogin(true);
                      clearError();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                      Вход
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleButton, !isLogin && styles.toggleActive]}
                    onPress={() => {
                      setIsLogin(false);
                      clearError();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                      Регистрация
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Поля формы */}
                {!isLogin && (
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIcon}>
                      <Ionicons name="person" size={20} color="#FFD700" />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Ваше имя"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="mail" size={20} color="#FFD700" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <Ionicons name="lock-closed" size={20} color="#FFD700" />
                  </View>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Пароль"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
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
                  <View style={styles.errorContainer}>
                    <Ionicons name="warning" size={20} color="#FF6B6B" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Кнопка отправки */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFC107']}
                    style={styles.submitGradient}
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
                        <Text style={styles.submitText}>
                          {isLogin ? 'Войти в приложение' : 'Создать аккаунт'}
                        </Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Быстрый вход (демо-пользователи) */}
                <View style={styles.demoSection}>
                  <Text style={styles.demoTitle}>Быстрый вход:</Text>
                  <View style={styles.demoButtons}>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={() => handleDemoLogin('santa@northpole.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.demoEmoji}>🎅</Text>
                      <Text style={styles.demoText}>Санта</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={() => handleDemoLogin('snowman@winter.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.demoEmoji}>⛄</Text>
                      <Text style={styles.demoText}>Олаф</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={() => handleDemoLogin('guest@newyear.com', '123456')}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.demoEmoji}>🎁</Text>
                      <Text style={styles.demoText}>Гость</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Информационная карточка */}
            <View style={styles.infoCard}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={styles.infoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.infoHeader}>
                  <Ionicons name="information-circle" size={28} color="#FFD700" />
                  <Text style={styles.infoTitle}>Преимущества аккаунта</Text>
                </View>
                <View style={styles.infoList}>
                  <View style={styles.infoItem}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>Сохранение прогресса</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="gift" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>Дополнительные функции</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="cloud" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>Синхронизация между устройствами</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="settings" size={16} color="#FFD700" />
                    <Text style={styles.infoText}>Персональные настройки</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerCenter: {
    alignItems: 'center',
  },
  titleBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 6,
  },
  titleBadgeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#81D4FA',
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 70,
  },
  snowflakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginVertical: 10,
    opacity: 0.6,
  },
  snowflake: {
    fontSize: 22,
  },
  snowflake2: {
    fontSize: 18,
  },
  snowflake3: {
    fontSize: 26,
  },
  welcomeCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  formGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  toggleActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  toggleTextActive: {
    color: '#FFD700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    padding: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  errorText: {
    color: '#FF9999',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  submitText: {
    color: '#0D1B2A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoSection: {
    marginBottom: 20,
  },
  demoTitle: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 12,
    textAlign: 'center',
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  demoButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  demoEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  demoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoGradient: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});