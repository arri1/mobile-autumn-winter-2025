import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/appnavigation';

export default function App() {
  return (    
      <>
        <StatusBar style="auto" />
        <AppNavigator />
      </>    
  );
}