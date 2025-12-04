import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect root path to the main tabs screen
  return <Redirect href="/(tabs)/useStateLab" />;
}




