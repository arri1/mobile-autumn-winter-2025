import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAuthStore } from '../hooks/useAuthStore'
import { useUserState } from '../hooks/useUserState'
import NameInput from './NameInput'
import AgeInput from './AgeInput'
import SubscriptionToggle from './SubscriptionToggle'
import HobbyButtons from './HobbyButtons'
import UserInfoDisplay from './UserInfoDisplay'

const MainScreen = () => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const {
    name,
    setName,
    age,
    setAge,
    isSubscribed,
    setIsSubscribed,
    hobbies,
    addHobby,
  } = useUserState()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главный экран</Text>
      <Text style={{ marginBottom: 10 }}>Добро пожаловать, {user?.name ?? 'гость'}!</Text>
      
      <View style={{ height: 20 }} />

      <NameInput value={name} onChangeText={setName} />
      <AgeInput value={age} onChangeText={setAge} />
      <SubscriptionToggle value={isSubscribed} onValueChange={setIsSubscribed} />
      <HobbyButtons onAddHobby={addHobby} />
      <UserInfoDisplay name={name} age={age} isSubscribed={isSubscribed} hobbies={hobbies} />
      <Button title="Выйти" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
})

export default MainScreen
