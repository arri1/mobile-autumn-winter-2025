import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';
import { appStyles } from './src/styles/appStyles';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('useState');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'useState':
        return <UseStateScreen />;
      case 'useEffect':
        return <UseEffectScreen />;
      case 'useMemo':
        return <UseMemoScreen />;
      default:
        return <UseStateScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={appStyles.container}>
        <View style={appStyles.content}>
          {renderScreen()}
        </View>
        
        <SafeAreaView edges={['bottom']} style={appStyles.tabBarContainer}>
          <View style={appStyles.tabBar}>
            <TouchableOpacity
              style={appStyles.tabItem}
              onPress={() => setCurrentScreen('useState')}
            >
              <View style={[
                appStyles.tabIcon,
                currentScreen === 'useState' && appStyles.tabIconFocused
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useState' && appStyles.tabIconTextFocused
                ]}>
                  S
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useState' && appStyles.tabLabelFocused
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
                currentScreen === 'useEffect' && appStyles.tabIconFocused
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useEffect' && appStyles.tabIconTextFocused
                ]}>
                  E
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useEffect' && appStyles.tabLabelFocused
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
                currentScreen === 'useMemo' && appStyles.tabIconFocused
              ]}>
                <Text style={[
                  appStyles.tabIconText,
                  currentScreen === 'useMemo' && appStyles.tabIconTextFocused
                ]}>
                  M
                </Text>
              </View>
              <Text style={[
                appStyles.tabLabel,
                currentScreen === 'useMemo' && appStyles.tabLabelFocused
              ]}>
                Memo
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default App;