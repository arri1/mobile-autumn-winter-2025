import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthStore } from './hooks/useAuthStore';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [route, setRoute] = useState('login');

  if (isAuthenticated) {
    return <MainScreen />;
  }

  const navigate = (to) => setRoute(to);

  return (
    <View style={styles.container}>
      {route === 'login' && <LoginScreen navigate={navigate} />}
      {route === 'register' && <RegisterScreen navigate={navigate} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'center'
  },
});