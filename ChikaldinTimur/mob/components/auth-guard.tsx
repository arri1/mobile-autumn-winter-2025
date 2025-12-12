import { PropsWithChildren } from 'react';
import { Redirect, useSegments } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export function AuthGuard({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const segments = useSegments();

  // If no user, keep user on auth tabs and block private tabs
  if (!user) {
    const onAuthTab = segments.includes('(tabs)') && ['login', 'register'].includes(segments.slice(-1)[0]);
    if (!onAuthTab) {
      return <Redirect href="/(tabs)/login" />;
    }
  }

  return children;
}

