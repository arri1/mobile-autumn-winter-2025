import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import UseStateScreen from '../screens/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
  },
};

const AppNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f5f5f5' },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Демо хуков' }}
      />
      <Stack.Screen
        name="useState"
        component={UseStateScreen}
        options={{ title: 'useState' }}
      />
      <Stack.Screen
        name="useEffect"
        component={UseEffectScreen}
        options={{ title: 'useEffect' }}
      />
      <Stack.Screen
        name="useMemo"
        component={UseMemoScreen}
        options={{ title: 'useMemo' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
