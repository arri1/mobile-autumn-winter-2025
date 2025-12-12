import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

const AuthScreen = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Валидация email с использованием useMemo
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  // Валидация пароля с использованием useMemo
  const isPasswordValid = useMemo(() => {
    return password.length >= 6;
  }, [password]);

  const doPasswordsMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // useEffect для очистки полей при переключении между логином и регистрацией
  useEffect(() => {
    if (isLogin) {
      setConfirmPassword('');
      setName('');
    }
  }, [isLogin]);

  const handleSubmit = async () => {
    if (!isValidEmail) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }

    if (!isPasswordValid) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    if (!isLogin && !doPasswordsMatch) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    setLoading(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      setLoading(false);
      
      // Для демо просто генерируем токен
      const token = `demo-token-${Date.now()}`;
      
      if (isLogin) {
        // Логика входа
        Alert.alert('Успешно', 'Вы успешно вошли в систему!');
        onLogin(token);
      } else {
        // Логика регистрации
        Alert.alert('Успешно', 'Регистрация завершена!');
        onRegister(token);
      }
    }, 1500);
  };

  const isFormValid = useMemo(() => {
    if (isLogin) {
      return isValidEmail && isPasswordValid && email && password;
    } else {
      return isValidEmail && isPasswordValid && doPasswordsMatch && email && password && confirmPassword && name;
    }
  }, [isLogin, isValidEmail, isPasswordValid, doPasswordsMatch, email, password, confirmPassword, name]);

  return (
    <SafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Container>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Header>
              <Emoji>{isLogin ? '🔐' : '📝'}</Emoji>
              <Title>{isLogin ? 'Вход в систему' : 'Регистрация'}</Title>
              <SubTitle>
                {isLogin 
                  ? 'Введите свои учетные данные' 
                  : 'Создайте новый аккаунт'}
              </SubTitle>
            </Header>

            <Card>
              <CardHeader>
                <CardTitle>Данные аккаунта</CardTitle>
                <Pill tone={isLogin ? 'success' : 'warning'}>
                  {isLogin ? 'Вход' : 'Регистрация'}
                </Pill>
              </CardHeader>
              
              <Divider />
              
              <Column>
                {!isLogin && (
                  <InputContainer>
                    <Label>Имя</Label>
                    <Input
                      value={name}
                      onChangeText={setName}
                      placeholder="Введите ваше имя"
                      placeholderTextColor="#889096"
                    />
                  </InputContainer>
                )}
                
                <InputContainer>
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    placeholderTextColor="#889096"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {email.length > 0 && !isValidEmail && (
                    <ErrorText>Некорректный email</ErrorText>
                  )}
                </InputContainer>
                
                <InputContainer>
                  <Label>Пароль</Label>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Минимум 6 символов"
                    placeholderTextColor="#889096"
                    secureTextEntry
                  />
                  {password.length > 0 && !isPasswordValid && (
                    <ErrorText>Пароль должен быть не менее 6 символов</ErrorText>
                  )}
                </InputContainer>
                
                {!isLogin && (
                  <InputContainer>
                    <Label>Подтверждение пароля</Label>
                    <Input
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Повторите пароль"
                      placeholderTextColor="#889096"
                      secureTextEntry
                    />
                    {confirmPassword.length > 0 && !doPasswordsMatch && (
                      <ErrorText>Пароли не совпадают</ErrorText>
                    )}
                  </InputContainer>
                )}
                
                <SubmitButton 
                  onPress={handleSubmit} 
                  disabled={!isFormValid || loading}
                  valid={isFormValid}
                >
                  {loading ? (
                    <ButtonText>Загрузка...</ButtonText>
                  ) : (
                    <ButtonText>{isLogin ? 'Войти' : 'Зарегистрироваться'}</ButtonText>
                  )}
                </SubmitButton>
                
                <ToggleContainer>
                  <ToggleText>
                    {isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
                  </ToggleText>
                  <ToggleButton onPress={() => setIsLogin(!isLogin)}>
                    <ToggleButtonText>
                      {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </ToggleButtonText>
                  </ToggleButton>
                </ToggleContainer>
              </Column>
            </Card>

            <InfoCard>
              <InfoTitle>Используемые хуки React:</InfoTitle>
              <Divider />
              <InfoRow>
                <HookEmoji>🎣</HookEmoji>
                <HookInfo>
                  <HookName>useState</HookName>
                  <HookDesc>Управление состоянием формы</HookDesc>
                </HookInfo>
              </InfoRow>
              <InfoRow>
                <HookEmoji>⏱️</HookEmoji>
                <HookInfo>
                  <HookName>useEffect</HookName>
                  <HookDesc>Очистка полей при переключении режима</HookDesc>
                </HookInfo>
              </InfoRow>
              <InfoRow>
                <HookEmoji>💾</HookEmoji>
                <HookInfo>
                  <HookName>useMemo</HookName>
                  <HookDesc>Мемоизация валидации и состояния формы</HookDesc>
                </HookInfo>
              </InfoRow>
            </InfoCard>

            <BottomSpacer />
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
      
      <StatusBar style="light" />
    </SafeArea>
  );
};

// Стили
const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0a0c10;
`;

const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

const Header = styled.View`
  margin-bottom: 32px;
  align-items: center;
`;

const Emoji = styled(Text)`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-size: 32px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 8px;
  text-align: center;
`;

const SubTitle = styled(Text)`
  color: #9aa4b2;
  font-size: 16px;
  text-align: center;
`;

const Card = styled.View`
  background-color: #0c0f14;
  border: 1px solid #1c2230;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CardTitle = styled(Text)`
  color: #e6e9ef;
  font-weight: 700;
  font-size: 18px;
`;

const Pill = styled(Text)`
  color: ${(p) => {
    if (p.tone === 'success') return '#5eead4';
    if (p.tone === 'warning') return '#f39c12';
    return '#b3b8c3';
  }};
  background-color: ${(p) => {
    if (p.tone === 'success') return '#0e2f25';
    if (p.tone === 'warning') return '#3d2c0d';
    return '#151a23';
  }};
  border: 1px solid ${(p) => {
    if (p.tone === 'success') return '#1f7a4a';
    if (p.tone === 'warning') return '#7a5a1f';
    return '#252a33';
  }};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

const Column = styled.View`
  gap: 16px;
`;

const InputContainer = styled.View`
  gap: 4px;
`;

const Label = styled(Text)`
  color: #b3b8c3;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;

const Input = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 14px 16px;
  color: #e6e9ef;
  font-size: 16px;
`;

const ErrorText = styled(Text)`
  color: #e74c3c;
  font-size: 12px;
  margin-left: 4px;
  margin-top: 2px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${(p) => p.valid ? '#5eead4' : '#2a2f3a'};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 8px;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
`;

const ButtonText = styled(Text)`
  color: #052925;
  font-weight: 700;
  font-size: 16px;
`;

const ToggleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const ToggleText = styled(Text)`
  color: #9aa4b2;
  font-size: 14px;
`;

const ToggleButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

const ToggleButtonText = styled(Text)`
  color: #5eead4;
  font-weight: 600;
  font-size: 14px;
`;

const InfoCard = styled(Card)`
  background-color: #0f1218;
  border-color: #3498db;
`;

const InfoTitle = styled(Text)`
  color: #3498db;
  font-weight: 700;
  font-size: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

const HookEmoji = styled(Text)`
  font-size: 24px;
  margin-right: 12px;
`;

const HookInfo = styled.View`
  flex: 1;
`;

const HookName = styled(Text)`
  color: #e6e9ef;
  font-weight: 600;
  font-size: 15px;
`;

const HookDesc = styled(Text)`
  color: #9aa4b2;
  font-size: 13px;
`;

const BottomSpacer = styled.View`
  height: 40px;
`;

export default AuthScreen;