import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useUserState } from '../hooks/useUserState'
import NameInput from './NameInput'
import AgeInput from './AgeInput'
import SubscriptionToggle from './SubscriptionToggle'
import HobbyButtons from './HobbyButtons'
import UserInfoDisplay from './UserInfoDisplay'

const UseStateEffect = ({ navigate }) => {
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
        <View style={{ height: 20 }} />
        <NameInput value={name} onChangeText={setName} />
        <AgeInput value={age} onChangeText={setAge} />
        <SubscriptionToggle value={isSubscribed} onValueChange={setIsSubscribed} />
        <HobbyButtons onAddHobby={addHobby} />
        <UserInfoDisplay name={name} age={age} isSubscribed={isSubscribed} hobbies={hobbies} />

        <View style={{ height: 12 }} />
        <Button title="Назад" onPress={() => navigate('main')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center' },
})

export default UseStateEffect
