import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles, lightTheme, darkTheme } from './components/AppStyles';
import UseStateScreen from './components/UseStateScreen';
import UseEffectScreen from './components/UseEffectScreen';
import UseMemoScreen from './components/UseMemoScreen';
 

const THEME_STORAGE_KEY = '@user_theme';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');
  const [sharedCount, setSharedCount] = useState(0);
 

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.warn('Ошибка загрузки темы:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const saveTheme = async () => {
      try {
        const value = isDarkMode ? 'dark' : 'light';
        await AsyncStorage.setItem(THEME_STORAGE_KEY, value);
      } catch (error) {
        console.warn('Ошибка сохранения темы:', error);
      }
    };

    saveTheme();
  }, [isDarkMode, isLoading]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

 

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#f0f0f0' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  const rende rNav = () => (
    <View style={{ width: '100%', paddingHorizontal: 16, paddingTop: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Button title="Home" onPress={() => setActiveScreen('home')} color={theme.button} />
        </View>
        <View style={{ width: 8 }} />
        <View style={{ flex: 1 }}>
          <Button title="useState" onPress={() => setActiveScreen('useState')} color={theme.button} />
        </View>
        <View style={{ width: 8 }} />
        <View style={{ flex: 1 }}>
          <Button title="useEffect" onPress={() => setActiveScreen('useEffect')} color={theme.button} />
        </View>
        <View style={{ width: 8 }} />
        <View style={{ flex: 1 }}>
          <Button title="useMemo" onPress={() => setActiveScreen('useMemo')} color={theme.button} />
        </View>
      </View>
    </View>
  );

  const renderScreen = () => {
    if (activeScreen === 'useState') {
      return (
        <View style={styles.innerContainer}>
          <UseStateScreen theme={theme} value={sharedCount} onChange={setSharedCount} />
        </View>
      );
    }
    if (activeScreen === 'useEffect') {
      return (
        <View style={styles.innerContainer}>
          <UseEffectScreen theme={theme} />
        </View>
      );
    }
    if (activeScreen === 'useMemo') {
      return (
        <View style={styles.innerContainer}>
          <UseMemoScreen theme={theme} value={sharedCount} />
        </View>
      );
    }
    return (
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Привет, React Native! 👋</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {isDarkMode ? 'Тёмная тема активна' : 'Светлая тема активна'}
        </Text>
        <Text style={[styles.status, { color: theme.text }]}>Тема сохраняется между перезапусками!</Text>
        <View style={{ height: 24 }} />
        
        <View style={styles.buttonContainer}>
          <Button
            title={isDarkMode ? 'Переключить на светлую' : 'Переключить на тёмную'}
            onPress={toggleTheme}
            color={theme.button}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}> 
      {renderScreen()}
      {renderNav()}
      
    </SafeAreaView>
  );
}