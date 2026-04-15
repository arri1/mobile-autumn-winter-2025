import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import useAuthStore, { AuthState } from '@/store/authStore';

export default function MainLayout() {
  const user = useAuthStore((state: AuthState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace({ pathname: '/login' } as const);
    }
  }, [user, router]);

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
