import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useAuthStore } from '../hooks/useAuthStore'

const LoginScreen = ({ navigate }) => {
  const login = useAuthStore((s) => s.login)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput placeholder="Имя" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Войти" onPress={() => login(name, password)} />
      <View style={{height:10}}/>
      <Button title="Зарегистрироваться" onPress={() => navigate('register')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
})

export default LoginScreen
