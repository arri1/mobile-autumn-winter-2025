import { Redirect } from 'expo-router';

import { useAuthStore } from '@/store/auth';

export default function Index() {
  const user = useAuthStore((state) => state.user);

  // Redirect root path to auth if not logged in, else to main tab
  return <Redirect href={user ? '/(tabs)/useStateLab' : '/(tabs)/login'} />;
}




