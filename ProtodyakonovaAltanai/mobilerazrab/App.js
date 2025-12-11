import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import UseStateScreen from './src/screens/UseStateLab/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectLab/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoLab/UseMemoScreen';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState('useState'); // 'useState', 'useEffect' или 'useMemo'

  // Проверяем авторизацию при загрузке
  React.useEffect(() => {
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

  const renderScreen = () => {
    switch(screen) {
      case 'useState':
        return <UseStateScreen />;
      case 'useEffect':
        return <UseEffectScreen />;
      case 'useMemo':
        return <UseMemoScreen />;
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
          style={[styles.tab, styles.logoutTab]} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutTabText}>
            Выйти
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
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5eead4',
  },
  tabText: {
    color: '#9aa4b2',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#5eead4',
  },
  logoutTab: {
    flex: 0.8,
    backgroundColor: '#2d1a1a',
    borderWidth: 1,
    borderColor: '#7a2a1f',
    borderRadius: 8,
    marginVertical: 8,
  },
  logoutTabText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: 14,
  },
});