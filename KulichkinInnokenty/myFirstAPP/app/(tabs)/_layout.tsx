import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Скрыть из табов
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Скрыть из табов
        }}
      />
      <Tabs.Screen
        name="UseState/index"
        options={{
          title: 'USE STATE',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="s.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="UseEffect/index"
        options={{
          title: 'USE EFFECT',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="e.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="UseMemo/index"
        options={{
          title: 'USE MEMO',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="m.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Zustand/index"
        options={{
          title: 'ZUSTAND',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="z.square.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
