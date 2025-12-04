import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';
import StatsScreen from './src/screens/StatsScreen';
import { appStyles } from './src/styles/appStyles';
import { useAppStore } from './src/store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from './src/styles/appStyles';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('useState');
  const { theme } = useAppStore();
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'useState':
        return <UseStateScreen />;
      case 'useEffect':
        return <UseEffectScreen />;
      case 'useMemo':
        return <UseMemoScreen />;
      case 'stats':
        return <StatsScreen />;
      default:
        return <UseStateScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <View style={[appStyles.container, { backgroundColor: themeStyles.background }]}>
        {/* Контент */}
        <View style={appStyles.content}>
          {renderScreen()}
        </View>
        
        {/* Нижняя навигация */}
        <SafeAreaView edges={['bottom']} style={[appStyles.tabBarContainer, { 
          backgroundColor: themeStyles.card,
          borderTopColor: themeStyles.border 
        }]}>
          <View style={appStyles.tabBar}>
            <TouchableOpacity
              style={appStyles.tabItem}
              onPress={() => setCurrentScreen('useState')}
            >
              <View style={[
                appStyles.tabIcon,
                currentScreen === 'useState' && appStyles.tabIconFocused,
                currentScreen === 'useState' && { backgroundColor: themeStyles.primary }
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useState' && appStyles.tabIconTextFocused,
                  { color: currentScreen === 'useState' ? '#fff' : themeStyles.secondary }
                ]}>
                  S
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useState' && appStyles.tabLabelFocused,
                { color: currentScreen === 'useState' ? themeStyles.primary : themeStyles.secondary }
              ]}>
                State
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={appStyles.tabItem}
              onPress={() => setCurrentScreen('useEffect')}
            >
              <View style={[
                appStyles.tabIcon,
                currentScreen === 'useEffect' && appStyles.tabIconFocused,
                currentScreen === 'useEffect' && { backgroundColor: themeStyles.primary }
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useEffect' && appStyles.tabIconTextFocused,
                  { color: currentScreen === 'useEffect' ? '#fff' : themeStyles.secondary }
                ]}>
                  E
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useEffect' && appStyles.tabLabelFocused,
                { color: currentScreen === 'useEffect' ? themeStyles.primary : themeStyles.secondary }
              ]}>
                Effect
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={appStyles.tabItem}
              onPress={() => setCurrentScreen('useMemo')}
            >
              <View style={[
                appStyles.tabIcon,
                currentScreen === 'useMemo' && appStyles.tabIconFocused,
                currentScreen === 'useMemo' && { backgroundColor: themeStyles.primary }
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useMemo' && appStyles.tabIconTextFocused,
                  { color: currentScreen === 'useMemo' ? '#fff' : themeStyles.secondary }
                ]}>
                  M
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useMemo' && appStyles.tabLabelFocused,
                { color: currentScreen === 'useMemo' ? themeStyles.primary : themeStyles.secondary }
              ]}>
                Memo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={appStyles.tabItem}
              onPress={() => setCurrentScreen('stats')}
            >
              <View style={[
                appStyles.tabIcon,
                currentScreen === 'stats' && appStyles.tabIconFocused,
                currentScreen === 'stats' && { backgroundColor: themeStyles.primary }
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'stats' && appStyles.tabIconTextFocused,
                  { color: currentScreen === 'stats' ? '#fff' : themeStyles.secondary }
                ]}>
                  📊
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'stats' && appStyles.tabLabelFocused,
                { color: currentScreen === 'stats' ? themeStyles.primary : themeStyles.secondary }
              ]}>
                Stats
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default App;