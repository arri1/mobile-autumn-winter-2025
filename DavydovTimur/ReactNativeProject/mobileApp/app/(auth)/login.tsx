import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { setTokens, clearTokens } from '../api/authStore';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const API_URL = 'https://cloud.kit-imi.info/api';

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Введите логин и пароль');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: username,
        password: password,
      };

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        if (data?.data?.accessToken && data?.data?.refreshToken) {
          setTokens(data.data.accessToken, data.data.refreshToken);
        } else {
          clearTokens();
        }
        setLoading(false);
        router.replace('/(tabs)/catalog');
      } else {
        setError(data?.message || 'Ошибка авторизации');
        setLoading(false);
      }
    } catch (e) {
      setError('Ошибка сети');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!username || !password) {
      setError('Введите email и пароль');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    setLoading(true);
    try {
      const payload: { email: string; password: string } = {
        email: username,
        password: password,
      };

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        if (data?.data?.accessToken && data?.data?.refreshToken) {
          setTokens(data.data.accessToken, data.data.refreshToken);
        } else {
          clearTokens();
        }
        setLoading(false);
        router.replace('/(tabs)/catalog');
      } else {
        if (data?.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map((e: any) => e.message || `${e.field}: ${e.message}`).join(', ');
          setError(errorMessages);
        } else {
          setError(data?.message || 'Ошибка регистрации');
        }
        setLoading(false);
      }
    } catch (e) {
      setError('Ошибка сети');
      setLoading(false);
    }
  };

  return (
    <View style={styles.bg}>
      <View style={styles.centerBox}>
        <Text style={styles.header}>{isRegisterMode ? 'Регистрация' : 'Вход в систему'}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          autoCapitalize="none"
          keyboardType="email-address"
          value={username}
          onChangeText={setUsername}
          autoFocus={!isRegisterMode}
        />
        
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Пароль"
            placeholderTextColor="#B0B0B0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {!isRegisterMode && (
            <TouchableOpacity onPress={() => window.alert('Восстановление пароля')} style={styles.forgotButton}>
              <Text style={styles.forgotText}>Забыли?</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={isRegisterMode ? handleRegister : handleLogin} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>{isRegisterMode ? 'Зарегистрироваться' : 'Войти'}</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.switchModeButton} 
          onPress={() => {
            setIsRegisterMode(!isRegisterMode);
            setError('');
          }}
        >
          <Text style={styles.switchModeText}>
            {isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#202130',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    width: '85%',
    backgroundColor: '#1C1E27',
    borderColor: '#404559',
    borderWidth: 1,
    borderRadius: 35,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 28,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: '#2E3140',
    color: '#fff',
  },
  hint: {
    color: '#B0B0B0',
    fontSize: 13,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  error: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#5940C4',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#2E3140',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginLeft: 6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  passwordRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    position: 'relative',
  },
  forgotButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
    zIndex: 2,
  },
  forgotText: {
    color: '#fff',
    opacity: 0.3,
    fontWeight: '600',
    fontSize: 12,
  },
  switchModeButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  switchModeText: {
    color: '#93E1A1',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
