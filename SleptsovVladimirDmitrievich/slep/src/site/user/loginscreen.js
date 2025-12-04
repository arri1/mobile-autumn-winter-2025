import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../auth/auth';

export default function RegisterScreen({ navigation }) {
  const { register, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    register({ email, password });
  };
  const currentTheme = {
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: '#333333',
    button: '#00ff00ff',
    inputBackground: '#2D2D2D',
  };

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: currentTheme.background,
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: currentTheme.text,
        textAlign: 'center',
      },
      card: {
        backgroundColor: currentTheme.card,
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: currentTheme.border,
      },
      input: {
        backgroundColor: currentTheme.inputBackground,
        borderWidth: 1,
        borderColor: currentTheme.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: currentTheme.text,
        marginBottom: 15,
      },
      error: {
        marginTop: 12,
        alignItems: 'center',
        color: '#ff0000ff',
        marginBottom: 12,
        fontSize: 20,
      },
      inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: currentTheme.text,
        marginBottom: 8,
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
      },
      statItem: {
        alignItems: 'center',
        flex: 1,
      },
      statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00ff00ff',
        marginBottom: 4,
      },
      statLabel: {
        fontSize: 12,
        color: currentTheme.text,
        textAlign: 'center',
      },
      subsetItem: {
        flexDirection: 'row',
        backgroundColor: currentTheme.inputBackground,
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: currentTheme.border,
        alignItems: 'center',
        minHeight: 50,
      },
      subsetIndex: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
        minWidth: 30,
      },
      scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
      },
      subsetText: {
        fontSize: 16,
        color: '#00ff00ff',
        flex: 1,
      },
    title: {
      marginTop: 12,
      alignItems: 'center',
      color: '#ffffffff',
      marginBottom: 12,
    },
    link: {
      marginTop: 12,
      alignItems: 'center',
      color: '#ffffffff',
    },
    linkWrap: {
      color: '#00ff00ff',
      fontSize: 14,
    },tSize: 14,
    Button: {
      padding: 8,
      marginRight: 5,
      backgroundColor: '#00ff00ff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    ButtonText: {
      fontSize: 18,
      color: '#000000ff',
      fontWeight: 'bold',
    },
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.Button} onPress={handleRegister}>
          <Text style={styles.ButtonText}>Создать аккаунт</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkWrap}>
        <Text style={styles.link}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}
