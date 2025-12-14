import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './src/navigation/AppTabs';

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <AppTabs cart={cart} setCart={setCart} />
    </NavigationContainer>
  );
}
