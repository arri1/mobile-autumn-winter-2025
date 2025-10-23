import React, { useEffect } from 'react';
import RootTabs from './src/navigation/RootTabs';
import useAuthStore from './src/store/authStore';

export default function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <RootTabs />;
}
