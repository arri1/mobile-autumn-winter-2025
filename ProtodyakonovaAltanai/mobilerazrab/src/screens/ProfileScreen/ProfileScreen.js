import React, { useState, useEffect, useMemo } from 'react';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Switch,
  ActivityIndicator,
  Text,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import useAuthStore from '../../store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

/**
 * Компонент экрана профиля пользователя
 * Демонстрирует работу с пользовательскими данными, настройками и статистикой
 */
const ProfileScreen = () => {
  // Получаем данные из хранилища аутентификации (Zustand)
  const { user: authUser, logout, getProfile, isLoading: authLoading } = useAuthStore();
  
   // Состояние данных пользователя
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: null,
  });

   // Состояние настроек приложения
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSave: false,
    language: 'ru',
  });

   // Состояние статистики пользователя
  const [stats, setStats] = useState({
    joinedDate: '',
    screensVisited: 0,
    totalTime: 0,
  });

  // Режим редактирования профиля
  const [isEditing, setIsEditing] = useState(false);
  // Состояние загрузки данных
  const [loading, setLoading] = useState(true);

  /**
   * Основной эффект при монтировании компонента
   * Загружает данные и запрашивает разрешения
   */
  useEffect(() => {
    loadUserData(); // Загрузка данных пользователя
    loadUserStats();  // Загрузка статистики
    
     // Асинхронная функция для запроса разрешений
    (async () => {
      // Запрашиваем разрешение на доступ к галерее
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Разрешение на доступ к галерее необходимо для выбора аватара');
      }
    })();
  }, []); // Пустой массив зависимостей = выполняется один раз при монтировании

  /**
   * Вычисляет количество дней с момента регистрации
   * Оптимизировано с useMemo для избежания лишних вычислений
   */
  const daysSinceRegistration = useMemo(() => {
    if (!stats.joinedDate) return 0;
    const joined = new Date(stats.joinedDate);
    const today = new Date();
    const diffTime = Math.abs(today - joined);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, [stats.joinedDate]); // Пересчитывается только при изменении даты регистрации

   /**
   * Вычисляет процент заполненности профиля
   * Используется для отображения прогресса
   */
  const profileCompletion = useMemo(() => {
    let completion = 0;
    // Каждое поле добавляет определенный процент
    if (user.name) completion += 25;
    if (user.email) completion += 25;
    if (user.phone) completion += 25;
    if (user.bio) completion += 15;
    if (user.avatar) completion += 10;
    return Math.min(completion, 100); // Ограничиваем 100%
  }, [user]); // Зависит от всех полей пользователя


   /**
   * Загружает данные пользователя из асинхронного хранилища и стора
   */
  const loadUserData = async () => {
    try {
      setLoading(true);
      
       // Если пользователь авторизован в сторе, заполняем данные
      if (authUser) {
        setUser({
          name: authUser.name || '',
          email: authUser.email || '',
          phone: authUser.phone || '',
          bio: authUser.bio || '',
          avatar: authUser.avatar || null,
        });
      }

       // Загружаем сохраненные настройки из AsyncStorage
      const storedSettings = await AsyncStorage.getItem('userSettings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };


  /**
   * Загружает статистику пользователя из AsyncStorage
   */
  const loadUserStats = async () => {
    try {
       // Получаем данные статистики
      const joined = await AsyncStorage.getItem('userJoinedDate');
      const screens = await AsyncStorage.getItem('screensVisited');
      const time = await AsyncStorage.getItem('totalTime');
      
       // Если дата регистрации не сохранена, устанавливаем текущую дату
      if (!joined && authUser) {
        const today = new Date().toISOString();
        await AsyncStorage.setItem('userJoinedDate', today);
        setStats(prev => ({ ...prev, joinedDate: today }));
      } else {
        setStats(prev => ({ ...prev, joinedDate: joined }));
      }
      
       // Обновляем статистику
      setStats(prev => ({
        ...prev,
        screensVisited: parseInt(screens) || 0,
        totalTime: parseInt(time) || 0,
      }));
    } catch (error) {
      console.log('Error loading stats:', error);
    }
  };


   /**
   * Сохраняет данные пользователя и настройки в AsyncStorage
   */
  const saveUserData = async () => {
    try {
      // Сохраняем профиль и настройки
      await AsyncStorage.setItem('userProfile', JSON.stringify(user));
      await AsyncStorage.setItem('userSettings', JSON.stringify(settings));
      Alert.alert('Успех', 'Данные сохранены!');
       // Выходим из режима редактирования
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    }
  };

  /**
   * Обработчик выхода из аккаунта с подтверждением
   */
  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: logout }
      ]
    );
  };

   /**
   * Обновляет конкретную настройку
   */
  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

   /**
   * Изменяет язык интерфейса
   */
  const handleLanguageChange = (newLanguage) => {
    updateSetting('language', newLanguage);
    Alert.alert('Язык изменен', `Язык изменен на ${newLanguage === 'ru' ? 'Русский' : 'English'}`);
  };

   /**
   * Обновляет профиль из сервера/стора
   */
  const refreshProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfile();
      if (profileData) {
        setUser({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          bio: profileData.bio || '',
          avatar: profileData.avatar || null,
        });
        Alert.alert('Успех', 'Профиль обновлен!');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить профиль');
    } finally {
      setLoading(false);
    }
  };

   // ЗАГРУЗОЧНОЕ СОСТОЯНИЕ
  if (loading || authLoading) {
    return (
      <SafeArea>
        <Container>
          <LoadingText>Загрузка профиля...</LoadingText>
        </Container>
      </SafeArea>
    );
  }

   // RENDER UI
  return (
    <SafeArea>
      <Container>
        <Header>
           {/* ЗАГОЛОВОК ЭКРАНА */}
          <Emoji>👤</Emoji>
          <Title>Личный кабинет</Title>
          <SubTitle>Управление профилем и настройками</SubTitle>
        </Header>

        {/* КАРТОЧКА ПРОФИЛЯ */}
        <Card>
          <CardHeader>
            <CardTitle>Профиль</CardTitle>
             {/* Индикатор заполненности профиля */}
            <Pill tone={profileCompletion === 100 ? 'success' : 'warning'}>
              {profileCompletion}% заполнено
            </Pill>
          </CardHeader>
          
          <Divider />
          
           {/* СЕКЦИЯ С АВАТАРОМ И ОСНОВНОЙ ИНФОРМАЦИЕЙ */}
          <ProfileSection>
            {/* КОНТЕЙНЕР АВАТАРА */}
            <AvatarContainer onPress={isEditing ? pickImage : null} disabled={!isEditing}>
              {user.avatar ? (
                <AvatarImage source={{ uri: user.avatar }} />
              ) : (
                <AvatarPlaceholder>
                  <AvatarText>{user.name ? user.name.charAt(0).toUpperCase() : '?'}</AvatarText>
                </AvatarPlaceholder>
              )}
              {isEditing && (
                <AvatarEditBadge>
                  <Text style={{ color: '#fff', fontSize: 12 }}>✏️</Text>
                </AvatarEditBadge>
              )}
            </AvatarContainer>
            
             {/* ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ */}
            <ProfileInfo>
              {isEditing ? (
                 /* В режиме редактирования - поля ввода */
                <>
                  <Input
                    value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })}
                    placeholder="Имя пользователя"
                    placeholderTextColor="#889096"
                  />
                  <Input
                    value={user.email}
                    onChangeText={(text) => setUser({ ...user, email: text })}
                    placeholder="Email"
                    placeholderTextColor="#889096"
                    keyboardType="email-address"
                  />
                </>
              ) : (
                  /* В режиме просмотра - текстовые поля */
                <>
                  <UserName>{user.name || 'Без имени'}</UserName>
                  <UserEmail>{user.email || 'email@example.com'}</UserEmail>
                </>
              )}
            </ProfileInfo>
          </ProfileSection>

           {/* ФОРМА ПРОФИЛЯ */}
          <Column>
            <InputContainer>
              <Label>Телефон</Label>
              <Input
                value={user.phone}
                onChangeText={(text) => setUser({ ...user, phone: text })}
                placeholder="+7 (999) 999-99-99"
                placeholderTextColor="#889096"
                keyboardType="phone-pad"
                editable={isEditing}
              />
            </InputContainer>

            <InputContainer>
              <Label>О себе</Label>
              <BioInput
                value={user.bio}
                onChangeText={(text) => setUser({ ...user, bio: text })}
                placeholder="Расскажите о себе..."
                placeholderTextColor="#889096"
                multiline
                numberOfLines={3}
                editable={isEditing} // Редактируемо только в режиме редактирования
              />
            </InputContainer>

            
            
            {/* КНОПКИ УПРАВЛЕНИЯ */}
            {isEditing ? (
               /* Кнопки в режиме редактирования */
              <Row space>
                <SaveButton onPress={saveUserData}>
                  <ButtonText>Сохранить</ButtonText>
                </SaveButton>
                <CancelButton onPress={() => setIsEditing(false)}>
                  <CancelButtonText>Отмена</CancelButtonText>
                </CancelButton>
              </Row>
            ) : (
               /* Кнопки в режиме просмотра */
              <>
                <EditButton onPress={() => setIsEditing(true)}>
                  <ButtonText>Редактировать профиль</ButtonText>
                </EditButton>
                <RefreshButton onPress={refreshProfile}>
                  <ButtonText>Обновить данные</ButtonText>
                </RefreshButton>
              </>
            )}
          </Column>
        </Card>

        {/* КАРТОЧКА СТАТИСТИКИ */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Статистика</CardTitle>
          </CardHeader>
          <Divider />
           {/* СЕТКА СТАТИСТИКИ */}
          <StatsGrid>
            <StatItem>
              <StatValue>{daysSinceRegistration}</StatValue>
              <StatLabel>дней с нами</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.screensVisited}</StatValue>
              <StatLabel>экранов посещено</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{Math.floor(stats.totalTime / 60)}</StatValue>
              <StatLabel>минут в приложении</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue tone="success">{profileCompletion}%</StatValue>
              <StatLabel>профиль заполнен</StatLabel>
            </StatItem>
          </StatsGrid>
        </Card>

        {/* КАРТОЧКА НАСТРОЕК */}
        <Card>
          <CardHeader>
            <CardTitle>⚙️ Настройки</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
           {/* НАСТРОЙКА УВЕДОМЛЕНИЙ */}
            <SettingRow>
              <SettingInfo>
                <SettingName>Уведомления</SettingName>
                <SettingDesc>Получать push-уведомления</SettingDesc>
              </SettingInfo>
              <Switch
                value={settings.notifications}
                onValueChange={(value) => updateSetting('notifications', value)}
                trackColor={{ false: '#767577', true: '#5eead4' }}
                thumbColor={settings.notifications ? '#052925' : '#f4f3f4'}
              />
            </SettingRow>

               {/* НАСТРОЙКА ТЕМЫ */}
            <SettingRow>
              <SettingInfo>
                <SettingName>Темная тема</SettingName>
                <SettingDesc>Использовать темную тему</SettingDesc>
              </SettingInfo>
              <Switch
                value={settings.darkMode}
                onValueChange={(value) => updateSetting('darkMode', value)}
                trackColor={{ false: '#767577', true: '#5eead4' }}
                thumbColor={settings.darkMode ? '#052925' : '#f4f3f4'}
              />
            </SettingRow>
             {/* НАСТРОЙКА АВТОСОХРАНЕНИЯ */}
            <SettingRow>
              <SettingInfo>
                <SettingName>Автосохранение</SettingName>
                <SettingDesc>Автоматически сохранять данные</SettingDesc>
              </SettingInfo>
              <Switch
                value={settings.autoSave}
                onValueChange={(value) => updateSetting('autoSave', value)}
                trackColor={{ false: '#767577', true: '#5eead4' }}
                thumbColor={settings.autoSave ? '#052925' : '#f4f3f4'}
              />
            </SettingRow>
              {/* НАСТРОЙКА ЯЗЫКА */}
            <SettingRow>
              <SettingInfo>
                <SettingName>Язык интерфейса</SettingName>
                <SettingDesc>Выберите предпочитаемый язык</SettingDesc>
              </SettingInfo>
              <LanguageButtons>
                <LanguageButton 
                  active={settings.language === 'ru'}
                  onPress={() => handleLanguageChange('ru')}
                >
                  <LanguageButtonText active={settings.language === 'ru'}>
                    🇷🇺 Русский
                  </LanguageButtonText>
                </LanguageButton>
                <LanguageButton 
                  active={settings.language === 'en'}
                  onPress={() => handleLanguageChange('en')}
                >
                  <LanguageButtonText active={settings.language === 'en'}>
                    🇺🇸 English
                  </LanguageButtonText>
                </LanguageButton>
              </LanguageButtons>
            </SettingRow>
          </Column>
        </Card>

        <ActionsCard>
          <ActionButton onPress={saveUserData}>
            <ActionEmoji>💾</ActionEmoji>
            <ActionText>Сохранить все настройки</ActionText>
          </ActionButton>
          
          <ActionButton onPress={() => Alert.alert('Помощь', 'Обратитесь в службу поддержки')}>
            <ActionEmoji>❓</ActionEmoji>
            <ActionText>Помощь и поддержка</ActionText>
          </ActionButton>
          
          <ActionButton danger onPress={handleLogout}>
            <ActionEmoji>🚪</ActionEmoji>
            <ActionText danger>Выйти из аккаунта</ActionText>
          </ActionButton>
        </ActionsCard>

        <InfoCard>
          <InfoTitle>Используемые хуки в этом экране:</InfoTitle>
          <Divider />
          <InfoRow>
            <HookEmoji>🎣</HookEmoji>
            <HookInfo>
              <HookName>useState</HookName>
              <HookDesc>Управление данными профиля и настройками</HookDesc>
            </HookInfo>
          </InfoRow>
          <InfoRow>
            <HookEmoji>⏱️</HookEmoji>
            <HookInfo>
              <HookName>useEffect</HookName>
              <HookDesc>Загрузка данных при монтировании компонента</HookDesc>
            </HookInfo>
          </InfoRow>
          <InfoRow>
            <HookEmoji>💾</HookEmoji>
            <HookInfo>
              <HookName>useMemo</HookName>
              <HookDesc>Вычисление статистики и заполненности профиля</HookDesc>
            </HookInfo>
          </InfoRow>
        </InfoCard>

        <BottomSpacer />
        <StatusBar style="light" />
      </Container>
    </SafeArea>
  );
};

// Стили 
const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0a0c10;
`;

const Container = styled.ScrollView`
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

const LoadingText = styled.Text`
  color: #9aa4b2;
  font-size: 18px;
  text-align: center;
  margin-top: 100px;
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

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarContainer = styled.TouchableOpacity`
  position: relative;
  opacity: ${(p) => (p.disabled ? 0.7 : 1)};
`;

const AvatarImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 2px solid #5eead4;
`;

const AvatarPlaceholder = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #1c2230;
  justify-content: center;
  align-items: center;
  border: 2px solid #5eead4;
`;

const AvatarText = styled.Text`
  color: #5eead4;
  font-size: 32px;
  font-weight: bold;
`;

const AvatarEditBadge = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #5eead4;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  border: 2px solid #0c0f14;
`;

const ProfileInfo = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const UserName = styled.Text`
  color: #e6e9ef;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const UserEmail = styled.Text`
  color: #9aa4b2;
  font-size: 14px;
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

const BioInput = styled.TextInput`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 14px 16px;
  color: #e6e9ef;
  font-size: 16px;
  min-height: 80px;
  text-align-vertical: top;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  ${(p) => (p.space ? 'justify-content: space-between;' : '')}
  margin-bottom: 16px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #5eead4;
  padding: 14px 24px;
  border-radius: 12px;
  flex: 1;
  margin-right: 8px;
  align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid #2a2f3a;
  padding: 14px 24px;
  border-radius: 12px;
  flex: 1;
  margin-left: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #052925;
  font-weight: 700;
  font-size: 16px;
`;

const CancelButtonText = styled.Text`
  color: #9aa4b2;
  font-weight: 700;
  font-size: 16px;
`;

const EditButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 14px 24px;
  border-radius: 12px;
  align-items: center;
`;

const RefreshButton = styled.TouchableOpacity`
  background-color: #2ecc71;
  padding: 14px 24px;
  border-radius: 12px;
  align-items: center;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0;
`;

const StatItem = styled.View`
  width: 48%;
  align-items: center;
  padding: 16px 0;
  background-color: #0f1218;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const StatValue = styled.Text`
  color: ${(p) => (p.tone === 'success' ? '#5eead4' : '#e6e9ef')};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  color: #9aa4b2;
  font-size: 12px;
  text-align: center;
`;

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const SettingInfo = styled.View`
  flex: 1;
`;

const SettingName = styled.Text`
  color: #e6e9ef;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 2px;
`;

const SettingDesc = styled.Text`
  color: #9aa4b2;
  font-size: 13px;
`;

const LanguageButtons = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const LanguageButton = styled.TouchableOpacity`
  background-color: ${(p) => (p.active ? '#0e2f25' : '#0f1218')};
  border: 1px solid ${(p) => (p.active ? '#1f7a4a' : '#1c2230')};
  padding: 8px 12px;
  border-radius: 8px;
  min-width: 100px;
  align-items: center;
`;

const LanguageButtonText = styled.Text`
  color: ${(p) => (p.active ? '#5eead4' : '#9aa4b2')};
  font-weight: 600;
  font-size: 14px;
`;

const ActionsCard = styled(Card)`
  background-color: #0f1218;
  border-color: #3498db;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${(p) => (p.danger ? '#2d1a1a' : 'transparent')};
  border-radius: 12px;
  margin-bottom: ${(p) => (p.danger ? '0' : '8px')};
  border: ${(p) => (p.danger ? '1px solid #7a2a1f' : 'none')};
`;

const ActionEmoji = styled.Text`
  font-size: 20px;
  margin-right: 12px;
`;

const ActionText = styled.Text`
  color: ${(p) => (p.danger ? '#e74c3c' : '#e6e9ef')};
  font-weight: 600;
  font-size: 16px;
  flex: 1;
`;

const InfoCard = styled(Card)`
  background-color: #0f1218;
  border-color: #9b59b6;
`;

const InfoTitle = styled.Text`
  color: #9b59b6;
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

export default ProfileScreen;