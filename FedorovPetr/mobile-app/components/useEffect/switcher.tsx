import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Example() {
  const [isOn, setIsOn] = useState(false);
  const [message, setMessage] = useState('Off');

  const sw = () => {
    setIsOn(prev => !prev);
  };

  useEffect(() => {
    setMessage(isOn ? 'On' : 'Off');
  }, [isOn]);

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{message}</Text>
      <View style={styles.buttonWrap}>
        <Button title="Переключить" onPress={sw} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  buttonWrap: {
    width: 180,
  },
});