import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useAuthStore } from '../hooks/useAuthStore'

const RegisterScreen = ({ navigate }) => {
  const register = useAuthStore((s) => s.register)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput placeholder="Имя" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Пароль" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Зарегистрироваться" onPress={() => register(name, password)} />
      <View style={{height:10}}/>
      <Button title="У меня уже есть аккаунт" onPress={() => navigate('login')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
})

export default RegisterScreen
