import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { AppStyles } from './src/styles/AppStyles';
import { useAuthStore } from './src/store/authStore';

const { width } = Dimensions.get('window');

export default function App() {
  const [screen, setScreen] = useState('home');
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    console.log('Auth status:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const renderScreen = () => {
    switch (screen) {
      case 'usestate':
        return <UseStateScreen goBack={() => setScreen('home')} />;
      case 'useeffect':
        return <UseEffectScreen goBack={() => setScreen('home')} />;
      case 'usememo':
        return <UseMemoScreen goBack={() => setScreen('home')} />;
      case 'auth':
        return <AuthScreen goBack={() => setScreen('home')} />;
      case 'profile':
        return <ProfileScreen goBack={() => setScreen('home')} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={AppStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={AppStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>      
         

          <View style={AppStyles.header}>
            <View style={AppStyles.newYearBadge}>
              <Text style={AppStyles.newYearText}>🎄 2025</Text>
            </View>
            
            {isAuthenticated && user ? (
              <TouchableOpacity
                style={AppStyles.profileButton}
                onPress={() => setScreen('profile')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 215, 0, 0.1)']}
                  style={AppStyles.profileButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={AppStyles.profileAvatar}>{user.avatar || '👤'}</Text>
                  <Text style={AppStyles.profileName} numberOfLines={1}>
                    {user.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={AppStyles.loginButton}
                onPress={() => setScreen('auth')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(0, 100, 200, 0.3)', 'rgba(0, 50, 150, 0.2)']}
                  style={AppStyles.loginButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="log-in" size={16} color="#FFD700" />
                  <Text style={AppStyles.loginButtonText}>Войти</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
            

          <View style={AppStyles.badgeContainer}>
            <View style={AppStyles.badge}>
              <Text style={AppStyles.badgeText}>✨ Праздничная версия</Text>
            </View>
          </View>
          

          {/* Декоративные снежинки */}
          <View style={AppStyles.snowflakeContainer}>
            <Text style={AppStyles.snowflake}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake2]}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake3]}>❄️</Text>
          </View>

          {/* Новогоднее сообщение */}
          <View style={AppStyles.newYearMessage}>
            <Text style={AppStyles.messageTitle}>С Новым Годом!</Text>
            <Text style={AppStyles.messageText}>
              
              {isAuthenticated && user && ` Добро пожаловать, ${user.name}!`}
            </Text>
          </View>

          {/* Статус авторизации */}
          <View style={AppStyles.statusCard}>
            <LinearGradient
              colors={isAuthenticated 
                ? ['#0b490fff','#35aa3dff', '#2E8B57']
                : ['#800707ff', '#D32F2F', '#B30000']
              }
              style={AppStyles.statusGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={AppStyles.statusContent}>
                <Ionicons 
                  name={isAuthenticated ? "checkmark-circle" : "lock-closed"} 
                  size={28} 
                  color="#FFD700" 
                />
                <View style={AppStyles.statusTextContainer}>
                  <Text style={AppStyles.statusTitle}>
                    {isAuthenticated ? 'Вы авторизованы' : 'Требуется авторизация'}
                  </Text>
                  <Text style={AppStyles.statusDescription}>
                    {isAuthenticated 
                      ? 'Доступ ко всем функциям открыт!'
                      : 'Войдите для сохранения прогресса'
                    }
                  </Text>
                </View>
              </View>
              {isAuthenticated && (
                <TouchableOpacity
                  style={AppStyles.logoutButton}
                  onPress={() => {
                    logout();
                    Alert.alert('Выход', 'Вы успешно вышли из системы');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={AppStyles.logoutButtonText}>Выйти</Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </View>

          {/* Декоративные снежинки */}
          <View style={AppStyles.snowflakeContainer}>
            <Text style={AppStyles.snowflake}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake2]}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake3]}>❄️</Text>
          </View>

          <View style={AppStyles.cardsContainer}>
            {/* UseState Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('usestate')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="snow" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>🎁</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useState</Text>
                    
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseEffect Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('useeffect')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#0b490fff','#35aa3dff', '#2E8B57']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="sparkles" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>✨</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useEffect</Text>
                    
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseMemo Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('usememo')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="gift" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>🎄</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useMemo</Text>
                   
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  return renderScreen();
}