import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
        name="index" // Это имя файла без расширения (profile.tsx)
        options={{
          title: 'Профиль',
          headerShown: false, // Обычно в профиле свой кастомный хедер
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="UseState/index"
        options={{
          title: 'useState',
          tabBarIcon: ({ color }) => <MaterialIcons name="draw" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="UseEffect/index"
        options={{
          title: 'useEffect',
          tabBarIcon: ({ color }) => <FontAwesome5 name="cat" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="UseMemo/index"
        options={{
          title: 'useMemo',
          tabBarIcon: ({ color }) => <FontAwesome5 name="list-alt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Zustand/index"
        options={{
          title: 'ZUSTAND',
          tabBarIcon: ({ color }) => <MaterialIcons name="login" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="posts/index"
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => <MaterialIcons name="signpost" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
