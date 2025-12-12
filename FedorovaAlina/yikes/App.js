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
import UseEffectScreen from './src/screens/UseEffectScreen'; // Добавляем импорт
import { AppStyles } from './src/styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeTab, setActiveTab] = useState('hooks');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'usestate':
        return <UseStateScreen goBack={() => setActiveScreen('home')} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />;
      case 'useeffect':
        return <UseEffectScreen goBack={() => setActiveScreen('home')} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />; // Добавляем useEffect
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

          {/* Контент главной страницы */}
          <View style={{ paddingHorizontal: 24, marginTop: 30 }}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, lineHeight: 24 }}>
              Выберите хук для изучения:
            </Text>
            
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity 
                style={[AppStyles.dockIcon, { width: '100%', height: 80, flexDirection: 'row', paddingHorizontal: 20 }]}
                onPress={() => setActiveScreen('usestate')}
                activeOpacity={0.7}
              >
                <Ionicons name="git-branch" size={32} color="#00d4ff" />
                <View style={{ marginLeft: 20, flex: 1 }}>
                  <Text style={{ color: '#00d4ff', fontSize: 20, fontWeight: 'bold' }}>useState</Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginTop: 4 }}>Управление состоянием компонентов</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.3)" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[AppStyles.dockIcon, { width: '100%', height: 80, flexDirection: 'row', paddingHorizontal: 20, marginTop: 16 }]}
                onPress={() => setActiveScreen('useeffect')}
                activeOpacity={0.7}
              >
                <Ionicons name="infinite" size={32} color="#ff2a6d" />
                <View style={{ marginLeft: 20, flex: 1 }}>
                  <Text style={{ color: '#ff2a6d', fontSize: 20, fontWeight: 'bold' }}>useEffect</Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginTop: 4 }}>Побочные эффекты и жизненный цикл</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.3)" />
              </TouchableOpacity>
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

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* useEffect экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('useeffect')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="infinite" size={24} color={activeScreen === 'useeffect' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'useeffect' && AppStyles.dockTextActive]}>
              useEffect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return renderScreen();
}