import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuthStore } from '@/store/auth';

export default function RegisterTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const { register, status, clearStatus, loading } = useAuthStore();

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => clearStatus(), 3000);
    return () => clearTimeout(timer);
  }, [status, clearStatus]);

  const handleRegister = () => {
    setLocalError(null);
    if (password !== confirm) {
      setLocalError('Пароли не совпадают.');
      return;
    }

    register({ name, email, password });
  };

  const message = localError ?? status?.message;
  const isError = Boolean(localError || status?.type === 'error');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Имя</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Иван Иванов" style={styles.input} />

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

        <Text style={styles.label}>Повторите пароль</Text>
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Создаем...' : 'Создать аккаунт'}</Text>
        </TouchableOpacity>

        {message && (
          <Text style={[styles.status, isError ? styles.statusError : styles.statusSuccess]}>{message}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
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
    backgroundColor: '#16a34a',
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
});

