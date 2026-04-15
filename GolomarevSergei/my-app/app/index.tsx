import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import useAuthStore, { AuthState } from '@/store/authStore';

export default function AuthLanding() {
  const user = useAuthStore((state: AuthState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/main' as any);
    }
  }, [user, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Авторизация</Text>
      <Text style={styles.subtitle}>Выберите вход или регистрацию</Text>

      <View style={styles.buttons}>
        <Link href="/login" style={styles.button}>
          <Text style={styles.buttonText}>Войти</Text>
        </Link>

        <Link href="/register" style={[styles.button, styles.secondaryButton]}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Регистрация</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#0f172a',
  },
});
