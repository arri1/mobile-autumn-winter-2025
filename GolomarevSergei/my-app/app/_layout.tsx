import React from 'react';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'useState', tabBarLabel: 'useState' }} />
      <Tabs.Screen name="use-effect" options={{ title: 'useEffect', tabBarLabel: 'useEffect' }} />
      <Tabs.Screen name="use-memo" options={{ title: 'useMemo', tabBarLabel: 'useMemo' }} />
    </Tabs>
  );
}
