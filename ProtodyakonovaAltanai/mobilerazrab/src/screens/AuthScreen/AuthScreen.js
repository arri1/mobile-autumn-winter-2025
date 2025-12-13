import React, { useState, useEffect, useMemo } from 'react';
import { 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useAuthStore from '../../store/authStore';

// Компонент экрана авторизации/регистрации, демонстрация хуков
const AuthScreen = () => { //управление формой
  // Определяем режим: вход или регистрация
  const [isLogin, setIsLogin] = useState(true);
  //поля формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // Получаем состояние и методы из хранилища аутентификации (Zustand)
  const { login, register, isLoading, error } = useAuthStore();

   // Валидация email с использованием регулярного выражения
  const isValidEmail = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  // Валидация длины пароля
  const isPasswordValid = useMemo(() => {
    return password.length >= 6;
  }, [password]);

  // Проверка совпадения паролей (только для регистрации)
  const doPasswordsMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Эффект для очистки полей при переключении режима
  useEffect(() => {
    if (isLogin) {
      setConfirmPassword('');
      setName(''); // Срабатывает при изменении isLogin
    }
  }, [isLogin]);

  // Эффект для показа ошибок из стора
  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
    }
  }, [error]);

  // Обработчик отправки формы, выполняет валидацию и вызывает соответствующий метод аутентификации
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

    if (!isLogin && !name.trim()) {
      Alert.alert('Ошибка', 'Введите имя');
      return;
    }

    try {
      if (isLogin) {
        // Вызов метода входа
        await login({ email, password });
        Alert.alert('Успешно', 'Вы успешно вошли в систему!');
      } else {
        // Вызов метода регистрации
        await register({ name, email, password });
        Alert.alert('Успешно', 'Регистрация завершена!');
      }
    } catch (err) {
      // Ошибка уже обрабатывается в сторе
    }
  };

  // Определение валидности всей формы
  const isFormValid = useMemo(() => {
    if (isLogin) {
      // Для входа: email и пароль должны быть заполнены и валидны
      return isValidEmail && isPasswordValid && email && password;
    } else {
      // Для регистрации: все поля должны быть заполнены и валидны
      return isValidEmail && isPasswordValid && doPasswordsMatch && email && password && confirmPassword && name;
    }
  }, [isLogin, isValidEmail, isPasswordValid, doPasswordsMatch, email, password, confirmPassword, name]);


  // Заполнение формы демо-данными для тестирования
  const handleDemoLogin = () => {
    if (isLogin) {
      // Демо-данные для входа
      setEmail('demo@example.com');
      setPassword('demo123');
      Alert.alert('Демо', 'Данные заполнены! Нажмите "Войти"');
    } else {
      // Демо-данные для регистрации
      setName('Демо Пользователь');
      setEmail('demo@example.com');
      setPassword('demo123');
      setConfirmPassword('demo123');
      Alert.alert('Демо', 'Данные заполнены! Нажмите "Зарегистрироваться"');
    }
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView //предотвращает наложение клавиатуры на поля ввода
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Container>
           {/* ScrollView для прокрутки на маленьких экранах */}
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

            {/* КАРТОЧКА С ФОРМОЙ */}       
            <Card>
              <CardHeader>
                <CardTitle>Данные аккаунта</CardTitle>
                {/* Показываем текущий режим с цветовой индикацией */}
                <Pill tone={isLogin ? 'success' : 'warning'}>
                  {isLogin ? 'Вход' : 'Регистрация'}
                </Pill>
              </CardHeader>
              
              <Divider />
              
              <Column>
              {/* ПОЛЕ ИМЕНИ (только для регистрации) */}
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
                
                 {/* ПОЛЕ EMAIL С ВАЛИДАЦИЕЙ */}
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
                  {/* Показываем ошибку если email некорректный */}
                  {email.length > 0 && !isValidEmail && (
                    <ErrorText>Некорректный email</ErrorText>
                  )}
                </InputContainer>
                
                 {/* ПОЛЕ ПАРОЛЯ С ВАЛИДАЦИЕЙ */}
                <InputContainer>
                  <Label>Пароль</Label>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Минимум 6 символов"
                    placeholderTextColor="#889096"
                    secureTextEntry
                  />
                  {/* Показываем ошибку если пароль слишком короткий */}
                  {password.length > 0 && !isPasswordValid && (
                    <ErrorText>Пароль должен быть не менее 6 символов</ErrorText>
                  )}
                </InputContainer>
                
                 {/* ПОЛЕ ПОДТВЕРЖДЕНИЯ ПАРОЛЯ (только для регистрации) */}
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
                    {/* Показываем ошибку если пароли не совпадают */}
                    {confirmPassword.length > 0 && !doPasswordsMatch && (
                      <ErrorText>Пароли не совпадают</ErrorText>
                    )}
                  </InputContainer>
                )}
                
                {/* КНОПКА ОТПРАВКИ ФОРМЫ */}
                <SubmitButton 
                  onPress={handleSubmit} 
                  disabled={!isFormValid || isLoading}
                  valid={isFormValid}
                >
                  {isLoading ? (
                    // Индикатор загрузки при отправке
                    <ActivityIndicator color="#052925" />
                  ) : (
                    <ButtonText>{isLogin ? 'Войти' : 'Зарегистрироваться'}</ButtonText>
                  )}
                </SubmitButton>

                {/* КНОПКА ДЕМО-ДАННЫХ */}
                <DemoButton onPress={handleDemoLogin} disabled={isLoading}>
                  <DemoButtonText>Заполнить демо данные</DemoButtonText>
                </DemoButton>
                
                {/* ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМА ВХОД/РЕГИСТРАЦИЯ */}
                <ToggleContainer>
                  <ToggleText>
                    {isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
                  </ToggleText>
                  <ToggleButton onPress={() => setIsLogin(!isLogin)} disabled={isLoading}>
                    <ToggleButtonText>
                      {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </ToggleButtonText>
                  </ToggleButton>
                </ToggleContainer>
              </Column>
            </Card>

            {/* ИНФОРМАЦИОННАЯ КАРТОЧКА О ХУКАХ REACT */}
            <InfoCard>
              <InfoTitle>Используемые хуки React:</InfoTitle>
              <Divider />

              {/* useState */}
              <InfoRow>
                <HookEmoji>🎣</HookEmoji>
                <HookInfo>
                  <HookName>useState</HookName>
                  <HookDesc>Управление состоянием формы</HookDesc>
                </HookInfo>
              </InfoRow>

              {/* useEffect */}
              <InfoRow>
                <HookEmoji>⏱️</HookEmoji>
                <HookInfo>
                  <HookName>useEffect</HookName>
                  <HookDesc>Очистка полей и обработка ошибок</HookDesc>
                </HookInfo>
              </InfoRow>

              {/* useMemo */}
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
      
       {/* Статус бар с светлой темой */}
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

const Emoji = styled.Text`
  font-size: 48px;
  margin-bottom: 12px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 8px;
  text-align: center;
`;

const SubTitle = styled.Text`
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

const CardTitle = styled.Text`
  color: #e6e9ef;
  font-weight: 700;
  font-size: 18px;
`;

// Динамически стилизуемый компонент с цветами в зависимости от tone
const Pill = styled.Text`
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

const Label = styled.Text`
  color: #b3b8c3;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
`;

const Input = styled.TextInput`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 14px 16px;
  color: #e6e9ef;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #e74c3c;
  font-size: 12px;
  margin-left: 4px;
  margin-top: 2px;
`;

// Кнопка с динамическим цветом фона в зависимости от валидности формы
const SubmitButton = styled.TouchableOpacity`
  background-color: ${(p) => p.valid ? '#5eead4' : '#2a2f3a'};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  margin-top: 8px;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
`;

const ButtonText = styled.Text`
  color: #052925;
  font-weight: 700;
  font-size: 16px;
`;

const DemoButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid #5eead4;
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
`;

const DemoButtonText = styled.Text`
  color: #5eead4;
  font-weight: 600;
  font-size: 16px;
`;

const ToggleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const ToggleText = styled.Text`
  color: #9aa4b2;
  font-size: 14px;
`;

const ToggleButton = styled.TouchableOpacity`
  margin-left: 8px;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
`;

const ToggleButtonText = styled.Text`
  color: #5eead4;
  font-weight: 600;
  font-size: 14px;
`;

const InfoCard = styled.View`
  background-color: #0f1218;
  border: 1px solid #3498db;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoTitle = styled.Text`
  color: #3498db;
  font-weight: 700;
  font-size: 16px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

const HookEmoji = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

const HookInfo = styled.View`
  flex: 1;
`;

const HookName = styled.Text`
  color: #e6e9ef;
  font-weight: 600;
  font-size: 15px;
`;

const HookDesc = styled.Text`
  color: #9aa4b2;
  font-size: 13px;
`;

const BottomSpacer = styled.View`
  height: 40px;
`;

export default AuthScreen;