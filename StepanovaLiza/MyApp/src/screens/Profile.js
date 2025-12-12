import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import useAuthStore from '../store/authStore';
import * as S from './ProfileStyle';

const ProfileScreen = ({ navigation }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    getProfile,
    initialize,
  } = useAuthStore();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', 
  });
  
  useEffect(() => {
    initialize();
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && !user) {
      getProfile();
    }
  }, [isAuthenticated, user]);
  
  useEffect(() => {
    clearError();
  }, [isLoginMode]);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async () => {
    if (isLoginMode) {
      if (!formData.email || !formData.password) {
        Alert.alert('Ошибка', 'Заполните все поля');
        return;
      }
      
      const result = await login(formData.email, formData.password);
      if (result.success) {
        Alert.alert('Успех', 'Вы успешно вошли!');
        setFormData({ email: '', password: '', name: '' });
      }
    } else {
      if (!formData.email || !formData.password || !formData.name) {
        Alert.alert('Ошибка', 'Заполните все поля');
        return;
      }
      
      const result = await register(formData.email, formData.password, formData.name);
      if (result.success) {
        Alert.alert('Успех', 'Вы успешно зарегистрировались!');
        setFormData({ email: '', password: '', name: '' });
      }
    }
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Выйти', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            setFormData({ email: '', password: '', name: '' });
          }
        },
      ]
    );
  };
  
  if (isLoading) {
    return (
      <S.CenterContainer>
        <ActivityIndicator size="large" color="#007AFF" />
        <S.LoadingText>
          {isLoginMode ? 'Вход...' : 'Регистрация...'}
        </S.LoadingText>
      </S.CenterContainer>
    );
  }
  
  // Если пользователь авторизован - показываем профиль
  if (isAuthenticated && user) {
    return (
      <S.Container>
        <ScrollView>
          <S.Header>
            <S.ProfileImage 
              source={{ 
                uri: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=007AFF&color=fff`
              }} 
            />
            <S.UserName>{user.name || user.email}</S.UserName>
            <S.UserEmail>{user.email}</S.UserEmail>
            {user.createdAt && (
              <S.MemberSince>
                Участник с: {new Date(user.createdAt).toLocaleDateString()}
              </S.MemberSince>
            )}
          </S.Header>
          
          <S.Section>
            <S.SectionTitle>Информация профиля</S.SectionTitle>
            
            <S.InfoCard>
              <S.InfoRow>
                <S.InfoLabel>Имя:</S.InfoLabel>
                <S.InfoValue>{user.name || 'Не указано'}</S.InfoValue>
              </S.InfoRow>
              
              <S.Divider />
              
              <S.InfoRow>
                <S.InfoLabel>Email:</S.InfoLabel>
                <S.InfoValue>{user.email}</S.InfoValue>
              </S.InfoRow>
              
              <S.Divider />
              
              <S.InfoRow>
                <S.InfoLabel>Роль:</S.InfoLabel>
                <S.InfoValue>{user.role || 'USER'}</S.InfoValue>
              </S.InfoRow>
              
              {user.id && (
                <>
                  <S.Divider />
                  <S.InfoRow>
                    <S.InfoLabel>ID:</S.InfoLabel>
                    <S.InfoValue>{user.id.substring(0, 8)}...</S.InfoValue>
                  </S.InfoRow>
                </>
              )}
            </S.InfoCard>
          </S.Section>
          
          <S.Section>
            <S.SectionTitle>Действия</S.SectionTitle>
            
            <S.ActionButton onPress={handleLogout} danger>
              <S.ActionButtonText>Выйти из аккаунта</S.ActionButtonText>
            </S.ActionButton>
          </S.Section>
          
          
        </ScrollView>
      </S.Container>
    );
  }
  
  // Если не авторизован - показываем форму входа/регистрации
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <S.Container>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <S.Header>
            <S.WelcomeTitle>
              {isLoginMode ? 'Добро пожаловать!' : 'Создайте аккаунт'}
            </S.WelcomeTitle>
            <S.WelcomeSubtitle>
              {isLoginMode 
                ? 'Войдите в свой аккаунт' 
                : 'Зарегистрируйтесь для доступа ко всем функциям'
              }
            </S.WelcomeSubtitle>
          </S.Header>
          
          {error && (
            <S.ErrorContainer>
              <S.ErrorText>{error}</S.ErrorText>
            </S.ErrorContainer>
          )}
          
          <S.Form>
            {!isLoginMode && (
              <>
                <S.Input
                  placeholder="Имя"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  autoCapitalize="words"
                />
                <S.InputSpacer />
              </>
            )}
            
            <S.Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <S.InputSpacer />
            
            <S.Input
              placeholder="Пароль"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            {isLoginMode && (
              <S.ForgotPassword>
                <S.ForgotPasswordText>Забыли пароль?</S.ForgotPasswordText>
              </S.ForgotPassword>
            )}
          </S.Form>
          
          <S.SubmitButton onPress={handleSubmit} disabled={isLoading}>
            <S.SubmitButtonText>
              {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
            </S.SubmitButtonText>
          </S.SubmitButton>
          
          <S.SwitchModeContainer>
            <S.SwitchModeText>
              {isLoginMode ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
            </S.SwitchModeText>
            <S.SwitchModeButton onPress={() => setIsLoginMode(!isLoginMode)}>
              <S.SwitchModeButtonText>
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </S.SwitchModeButtonText>
            </S.SwitchModeButton>
          </S.SwitchModeContainer>
          
        </ScrollView>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;