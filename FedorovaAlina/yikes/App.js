import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from './src/screens/UseStateScreen';
import { AppStyles } from './src/styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('hooks');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'usestate':
        return <UseStateScreen goBack={() => setActiveScreen('home')} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <View style={AppStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={AppStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.scrollView}>
          {/* Хедер */}
          <View style={AppStyles.header}>
            <View style={AppStyles.systemInfo}>
              <Text style={AppStyles.systemTitle}>REACT NATIVE</Text>
              <Text style={AppStyles.systemSubtitle}>HOOKS v2.0.5</Text>
            </View>
            <View style={AppStyles.systemStatus}>
              <View style={AppStyles.statusDot}></View>
              <Text style={AppStyles.statusText}>ONLINE</Text>
            </View>
          </View>

          {/* Пробел для нижней навигации */}
          <View style={AppStyles.bottomSpacer}></View>
        </ScrollView>
      </SafeAreaView>

      {/* Нижняя док-панель */}
      <View style={AppStyles.dockContainer}>
        <View style={AppStyles.dock}>
          {/* Главный экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('home')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="home" size={24} color={activeScreen === 'home' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'home' && AppStyles.dockTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* useState экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usestate')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="git-branch" size={24} color={activeScreen === 'usestate' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usestate' && AppStyles.dockTextActive]}>
              useState
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return renderScreen();
}