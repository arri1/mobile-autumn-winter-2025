import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import UseStateScreen from './src/screens/UseStateLab/UseStateScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <UseStateScreen />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
});