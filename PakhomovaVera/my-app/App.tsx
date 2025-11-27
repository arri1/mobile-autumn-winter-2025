import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TodoAdvancedScreen } from './src/screens/UseMemo_Analiz';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TodoAdvancedScreen />
    </>
  );
}