import { Tabs } from 'expo-router';
import React from 'react';

import { AuthGuard } from '@/components/auth-guard';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useAuthStore((state) => state.user);

  const hiddenTab = {
    tabBarButton: () => null,
    tabBarItemStyle: { display: 'none' as const },
  };

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
            ...(user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: 'Register',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.badge.plus" color={color} />
            ),
            ...(user ? hiddenTab : null),
          }}
        />

        <Tabs.Screen
          name="zustandAction"
          options={{
            title: 'Zustand Add',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.and.pencil" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="zustandResults"
          options={{
            title: 'Zustand View',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="useStateLab"
          options={{
            title: 'useState',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="useEffectLab"
          options={{
            title: 'useEffect',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="useMemoLab"
          options={{
            title: 'useMemo',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
        <Tabs.Screen
          name="posts"
          options={{
            title: 'Посты',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text" color={color} />,
            ...(!user ? hiddenTab : null),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}