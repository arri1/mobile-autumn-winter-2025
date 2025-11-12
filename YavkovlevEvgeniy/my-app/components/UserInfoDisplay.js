import React from "react";
import { Text, StyleSheet } from 'react-native'

const UserInfoDisplay = ({ name, age, isSubscribed, hobbies }) => (
  <>
    <Text style={styles.result}>
      Привет, {name}! Вам {age} лет.
    </Text>
    <Text>
      Кнопка: {isSubscribed ? 'Включена' : 'Выключена'}
    </Text>
    <Text>Ваши хобби: {hobbies.join(', ')}</Text>
  </>
);

const styles = StyleSheet.create({
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserInfoDisplay;