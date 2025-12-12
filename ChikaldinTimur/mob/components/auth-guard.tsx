import { Redirect, useSegments } from 'expo-router';
import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/store/auth';

export function AuthGuard({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const segments = useSegments() as string[]; // cast to avoid typed-routes inferring never[]

  // If no user, keep user on auth tabs and block private tabs
  if (!user) {
    // During initial hydration segments can be empty; avoid redirect flicker/loop
    if (segments.length === 0) {
      return null;
    }

    const lastSegment = segments[segments.length - 1] ?? '';
    const onAuthTab = segments[0] === '(tabs)' && ['login', 'register'].includes(lastSegment);
    if (!onAuthTab) {
      return <Redirect href="/(tabs)/login" />;
    }
  }

  return children;
}

