import React, { useState, useEffect } from 'react';
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import useAuthStore from '../store/authStore';
import * as Style from './ProfileStyle';

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
      <Style.CenterContainer>
        <ActivityIndicator size="large" color="#007AFF" />
        <Style.LoadingText>
          {isLoginMode ? 'Вход...' : 'Регистрация...'}
        </Style.LoadingText>
      </Style.CenterContainer>
    );
  }
  
  if (isAuthenticated && user) {
    return (
      <Style.Container>
        <Style.SafeArea>
          <Style.Header>
            <Style.Title>Профиль</Style.Title>
            <Style.SubTitle>Информация о пользователе</Style.SubTitle>
          </Style.Header>

          <Style.Card>
            <Style.CardHeader>
              <Style.CardTitle>Профиль пользователя</Style.CardTitle>
            </Style.CardHeader>
            <Style.Divider />
            <Style.ProfileContainer>
              <Style.ProfileImage 
                source={{ 
                  uri: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4b87a2&color=fff`
                }} 
              />
              <Style.UserName>{user.name || user.email}</Style.UserName>
              <Style.UserEmail>{user.email}</Style.UserEmail>
              {user.createdAt && (
                <Style.MemberSince>
                  Участник с: {new Date(user.createdAt).toLocaleDateString()}
                </Style.MemberSince>
              )}
            </Style.ProfileContainer>
          </Style.Card>

          <Style.Card>
            <Style.CardHeader>
              <Style.CardTitle>Информация профиля</Style.CardTitle>
            </Style.CardHeader>
            <Style.Divider />
            <Style.InfoRow>
              <Style.InfoLabel>Имя:</Style.InfoLabel>
              <Style.InfoValue>{user.name || 'Не указано'}</Style.InfoValue>
            </Style.InfoRow>
            <Style.Divider />
            <Style.InfoRow>
              <Style.InfoLabel>Email:</Style.InfoLabel>
              <Style.InfoValue>{user.email}</Style.InfoValue>
            </Style.InfoRow>
            <Style.Divider />
            <Style.InfoRow>
              <Style.InfoLabel>Роль:</Style.InfoLabel>
              <Style.InfoValue>{user.role || 'USER'}</Style.InfoValue>
            </Style.InfoRow>
            {user.id && (
              <>
                <Style.Divider />
                <Style.InfoRow>
                  <Style.InfoLabel>ID:</Style.InfoLabel>
                  <Style.InfoValue>{user.id.substring(0, 8)}...</Style.InfoValue>
                </Style.InfoRow>
              </>
            )}
          </Style.Card>

          <Style.Card>
            <Style.CardHeader>
              <Style.CardTitle>Действия</Style.CardTitle>
            </Style.CardHeader>
            <Style.Divider />
            <Style.LogoutButton onPress={handleLogout}>
              <Style.BtnText>Выйти из аккаунта</Style.BtnText>
            </Style.LogoutButton>
          </Style.Card>

          <Style.BottomSpacer />
        </Style.SafeArea>
      </Style.Container>
    );
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Style.Container>
        <Style.SafeArea>
          <Style.Header>
            <Style.Title>Профиль</Style.Title>
            <Style.SubTitle>Аутентификация</Style.SubTitle>
          </Style.Header>

          <Style.Card>
            <Style.CardHeader>
              <Style.CardTitle>
                {isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}
              </Style.CardTitle>
            </Style.CardHeader>
            <Style.Divider />
            
            {error && (
              <Style.ErrorContainer>
                <Style.ErrorText>{error}</Style.ErrorText>
              </Style.ErrorContainer>
            )}
            
            {!isLoginMode && (
              <>
                <Style.Input
                  placeholder="Имя"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  autoCapitalize="words"
                  placeholderTextColor="#889096"
                />
                <Style.InputSpacer />
              </>
            )}
            
            <Style.Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#889096"
            />
            <Style.InputSpacer />
            
            <Style.Input
              placeholder="Пароль"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#889096"
            />
            
            {isLoginMode && (
              <Style.ForgotPassword>
                <Style.ForgotPasswordText>Забыли пароль?</Style.ForgotPasswordText>
              </Style.ForgotPassword>
            )}
            
            <Style.Divider />
            
            <Style.SubmitButton onPress={handleSubmit} disabled={isLoading}>
              <Style.BtnText>
                {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
              </Style.BtnText>
            </Style.SubmitButton>
          </Style.Card>

          <Style.Card>
            <Style.SwitchModeContainer>
              <Style.SwitchModeText>
                {isLoginMode ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
              </Style.SwitchModeText>
              <Style.SwitchModeButton onPress={() => setIsLoginMode(!isLoginMode)}>
                <Style.SwitchModeButtonText>
                  {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
                </Style.SwitchModeButtonText>
              </Style.SwitchModeButton>
            </Style.SwitchModeContainer>
          </Style.Card>

          <Style.BottomSpacer />
        </Style.SafeArea>
      </Style.Container>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;