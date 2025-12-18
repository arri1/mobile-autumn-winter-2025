import React, { useMemo } from "react";
import { Text, StyleSheet } from 'react-native'

const UserInfoDisplay = ({ name, age, isSubscribed, hobbies }) => {
  const greeting = useMemo(() => `Привет, ${name}! Вам ${age} лет.`, [name, age]);
  const hobbyText = useMemo(() => (hobbies && hobbies.length ? hobbies.join(', ') : 'нет'), [hobbies]);

  return (
    <>
      <Text style={styles.result}>{greeting}</Text>
      <Text>Кнопка: {isSubscribed ? 'Включена' : 'Выключена'}</Text>
      <Text>Ваши хобби: {hobbyText}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserInfoDisplay;