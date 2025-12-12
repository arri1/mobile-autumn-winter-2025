import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useAppStore } from './src/store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from './src/styles/appStyles';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const { theme } = useAppStore();
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaProvider>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <View style={{ flex: 1, backgroundColor: themeStyles.background }}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
};

export default App;