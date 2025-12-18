import { Redirect, useSegments } from 'expo-router';
import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/store/auth';

export function AuthGuard({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const segments = useSegments() as string[]; // cast to avoid typed-routes inferring never[]

  // During initial hydration segments can be empty; avoid redirect flicker/loop
  if (segments.length === 0) {
    return null;
  }

  const lastSegment = segments[segments.length - 1] ?? '';
  const inTabs = segments[0] === '(tabs)';
  const onAuthTab = inTabs && ['login', 'register'].includes(lastSegment);
  const onPrivateTab = inTabs && !onAuthTab;

  // Not signed in: keep user on auth tabs and block private tabs
  if (!user && onPrivateTab) {
    return <Redirect href="/(tabs)/login" />;
  }

  // Signed in: don't allow auth tabs to stay visible/active
  if (user && onAuthTab) {
    // typed-routes may not include newly added routes until regen; cast to avoid blocking builds
    return <Redirect href={'/(tabs)/posts' as any} />;
  }

  return children;
}

