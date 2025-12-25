import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Counter from './components/useState/counter'
import Switcher from './components/useEffect/switcher'
import Sorter from './components/useMemo/sorter'
import Nav from './components/navigation/navigation';
import Registr from './components/registration/registr';
import Auth from './components/auth/auth';
import Post from './components/post/post'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);
  if (isAuthenticated) {
    return <Nav />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {showRegister ? (
          <Registr />
        ) : (
          <Auth onSuccess={() => setIsAuthenticated(true)} />
        )}
      </View>
      <View style={{ padding: 20 }}>
        <Button
          title={showRegister ? 'Войти' : 'Регистрация'}
          onPress={() => setShowRegister(!showRegister)}
        />
      </View>
    </View>
  );
}