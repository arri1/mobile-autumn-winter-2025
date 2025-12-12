import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import UseStateScreen from './src/screens/UseStateLab/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectLab/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoLab/UseMemoScreen';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState('useState'); // 'useState', 'useEffect', 'useMemo', 'profile'

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Error checking auth:', error);
    }
  };

  const handleLogin = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      // Создаем базовый профиль
      const userProfile = {
        name: 'Пользователь',
        email: 'user@example.com',
        phone: '',
        bio: '',
        avatar: null,
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      const userSettings = {
        notifications: true,
        darkMode: true,
        autoSave: false,
        language: 'ru',
      };
      await AsyncStorage.setItem('userSettings', JSON.stringify(userSettings));
      
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error saving token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
      setScreen('useState');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const handleRegister = async (token) => {
    await handleLogin(token);
  };

  // Функция для обновления статистики посещений экранов
  const updateScreenVisit = (screenName) => {
    AsyncStorage.getItem('screensVisited').then(visits => {
      const currentVisits = parseInt(visits) || 0;
      AsyncStorage.setItem('screensVisited', String(currentVisits + 1));
    });
  };

  // Функция для обновления времени в приложении
  useEffect(() => {
    let interval;
    if (isAuthenticated) {
      interval = setInterval(() => {
        AsyncStorage.getItem('totalTime').then(time => {
          const currentTime = parseInt(time) || 0;
          AsyncStorage.setItem('totalTime', String(currentTime + 1));
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && screen) {
      updateScreenVisit(screen);
    }
  }, [screen, isAuthenticated]);

  const renderScreen = () => {
    switch(screen) {
      case 'useState':
        return <UseStateScreen />;
      case 'useEffect':
        return <UseEffectScreen />;
      case 'useMemo':
        return <UseMemoScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <UseStateScreen />;
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, screen === 'useState' && styles.activeTab]} 
          onPress={() => setScreen('useState')}
        >
          <Text style={[styles.tabText, screen === 'useState' && styles.activeTabText]}>
            useState
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, screen === 'useEffect' && styles.activeTab]} 
          onPress={() => setScreen('useEffect')}
        >
          <Text style={[styles.tabText, screen === 'useEffect' && styles.activeTabText]}>
            useEffect
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, screen === 'useMemo' && styles.activeTab]} 
          onPress={() => setScreen('useMemo')}
        >
          <Text style={[styles.tabText, screen === 'useMemo' && styles.activeTabText]}>
            useMemo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, screen === 'profile' && styles.activeTab]} 
          onPress={() => setScreen('profile')}
        >
          <Text style={[styles.tabText, screen === 'profile' && styles.activeTabText]}>
            👤 Профиль
          </Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0c0f14',
    borderTopWidth: 1,
    borderTopColor: '#1c2230',
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#5eead4',
  },
  tabText: {
    color: '#9aa4b2',
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#5eead4',
    fontWeight: '700',
  },
});
