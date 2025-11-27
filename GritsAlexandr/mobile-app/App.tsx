import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
  },
};

const App = () => (
  <SafeAreaProvider>
    <StatusBar style="dark" />
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
  </SafeAreaProvider>
);

export default App;