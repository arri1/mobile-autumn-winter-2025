import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuthStore } from '@/store/auth';

export default function LoginTab() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, logout, user, status, clearStatus, loading } = useAuthStore();

  const isLoggedIn = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => clearStatus(), 3000);
    return () => clearTimeout(timer);
  }, [status, clearStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Вход</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => login({ email, password })}
          disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Входим...' : 'Войти'}</Text>
        </TouchableOpacity>

        {status && (
          <Text
            style={[
              styles.status,
              status.type === 'error' ? styles.statusError : styles.statusSuccess,
            ]}>
            {status.message}
          </Text>
        )}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Текущий пользователь</Text>
        {isLoggedIn ? (
          <>
            <Text style={styles.infoText}>{user?.name || 'Без имени'}</Text>
            <Text style={styles.infoSubtext}>{user?.email}</Text>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={logout}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Выйти</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.infoText}>Никто не авторизован</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
  },
  statusError: {
    color: '#b91c1c',
  },
  statusSuccess: {
    color: '#15803d',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    gap: 6,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 15,
    color: '#111827',
  },
  infoSubtext: {
    fontSize: 13,
    color: '#4b5563',
  },
  secondaryButton: {
    backgroundColor: '#e0e7ff',
  },
  secondaryButtonText: {
    color: '#1e3a8a',
  },
});

