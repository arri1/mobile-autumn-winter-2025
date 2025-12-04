import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import Task1Screen from './components/Task1Screen';
import Task2Screen from './components/Task2Screen';
import Task3Screen from './components/Task3Screen';

type Screen = 'home' | 'task1' | 'task2' | 'task3';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: 'task1' | 'task2' | 'task3') => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
      {currentScreen === 'task1' && <Task1Screen onBack={handleBack} />}
      {currentScreen === 'task2' && <Task2Screen onBack={handleBack} />}
      {currentScreen === 'task3' && <Task3Screen onBack={handleBack} />}
      <StatusBar style="auto" />
    </>
  );
}
