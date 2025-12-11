import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import UseStateScreen from './src/screens/UseStateLab/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectLab/UseEffectScreen';

export default function App() {
  const [screen, setScreen] = useState('useState'); // 'useState' или 'useEffect'

  return (
    <View style={styles.container}>
      {screen === 'useState' ? <UseStateScreen /> : <UseEffectScreen />}
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, screen === 'useState' && styles.activeTab]} 
          onPress={() => setScreen('useState')}
        >
          <Text style={[styles.tabText, screen === 'useState' && styles.activeTabText]}>
            useState
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, screen === 'useEffect' && styles.activeTab]} 
          onPress={() => setScreen('useEffect')}
        >
          <Text style={[styles.tabText, screen === 'useEffect' && styles.activeTabText]}>
            useEffect
          </Text>
        </TouchableOpacity>
      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0c0f14',
    borderTopWidth: 1,
    borderTopColor: '#1c2230',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5eead4',
  },
  tabText: {
    color: '#9aa4b2',
    fontWeight: '600',
    fontSize: 16,
  },
  activeTabText: {
    color: '#5eead4',
  },
});