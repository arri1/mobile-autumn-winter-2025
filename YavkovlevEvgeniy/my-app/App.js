import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { useUserState } from './hooks/useUserState';
import NameInput from './components/NameInput';
import AgeInput from './components/AgeInput';
import SubscriptionToggle from './components/SubscriptionToggle';
import HobbyButtons from './components/HobbyButtons';
import UserInfoDisplay from './components/UserInfoDisplay';

export default function App() {
  const {
    name,
    setName,
    age,
    setAge,
    isSubscribed,
    setIsSubscribed,
    hobbies,
    addHobby
  } = useUserState();

  return (
    <View style={styles.container}>
      <NameInput value={name} onChangeText={setName}/>
      <AgeInput value={age} onChangeText={setAge}/>
      <SubscriptionToggle value={isSubscribed} onValueChange={setIsSubscribed}/>
      <HobbyButtons onAddHobby={addHobby}/>
      <UserInfoDisplay
        name={name}
        age={age}
        isSubscribed={isSubscribed}
        hobbies={hobbies}
      />
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