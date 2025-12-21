import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';
import { AppStyles } from './src/styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [user] = useState({ name: 'User', role: 'user' });

  const renderScreen = () => {
    switch (activeScreen) {
      case 'usestate':
        return (
          <UseStateScreen 
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
          />
        );
      case 'useeffect':
        return (
          <UseEffectScreen 
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
          />
        );
      case 'usememo':
        return (
          <UseMemoScreen 
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
          />
        );
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <View style={AppStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={AppStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.scrollView}>
          {/* Хедер с информацией о пользователе */}
          <View style={AppStyles.header}>
            <View style={AppStyles.systemInfo}>
              <Text style={AppStyles.systemTitle}>REACT NATIVE HOOKS</Text>
              <Text style={AppStyles.systemSubtitle}>v2.0.5 | {user?.name || 'User'}</Text>
            </View>
            <TouchableOpacity 
              style={[AppStyles.systemStatus, { flexDirection: 'row', alignItems: 'center' }]}
              activeOpacity={0.7}
            >
              <View style={AppStyles.statusDot}></View>
              <Text style={AppStyles.statusText}>{user?.role?.toUpperCase() || 'USER'}</Text>
              <Ionicons name="person" size={16} color="#00d4ff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          {/* Приветствие */}
          <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
            <View style={{ 
              backgroundColor: 'rgba(0, 212, 255, 0.05)', 
              borderRadius: 16, 
              padding: 20,
              borderWidth: 1,
              borderColor: 'rgba(0, 212, 255, 0.1)',
              marginBottom: 30 
            }}>
              <Text style={{ 
                color: '#00d4ff', 
                fontSize: 18, 
                fontWeight: 'bold',
                marginBottom: 8 
              }}>
                Welcome, {user?.name}!
              </Text>
              <Text style={{ 
                color: 'rgba(255, 255, 255, 0.7)', 
                fontSize: 14, 
                lineHeight: 20 
              }}>
                React Native Hooks — киберпанк-интерфейс для изучения React Hooks. Выберите хук для изучения:
              </Text>
            </View>
          </View>

          {/* Список хуков */}
          <View style={{ paddingHorizontal: 24 }}>
            <TouchableOpacity 
              style={[AppStyles.dockIcon, { 
                width: '100%', 
                height: 80, 
                flexDirection: 'row', 
                paddingHorizontal: 20,
                marginBottom: 16
              }]}
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
              style={[AppStyles.dockIcon, { 
                width: '100%', 
                height: 80, 
                flexDirection: 'row', 
                paddingHorizontal: 20,
                marginBottom: 16
              }]}
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

            <TouchableOpacity 
              style={[AppStyles.dockIcon, { 
                width: '100%', 
                height: 80, 
                flexDirection: 'row', 
                paddingHorizontal: 20,
                marginBottom: 16
              }]}
              onPress={() => setActiveScreen('usememo')}
              activeOpacity={0.7}
            >
              <Ionicons name="flash" size={32} color="#00d4ff" />
              <View style={{ marginLeft: 20, flex: 1 }}>
                <Text style={{ color: '#00d4ff', fontSize: 20, fontWeight: 'bold' }}>useMemo</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, marginTop: 4 }}>Оптимизация вычислений и кэширование</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="rgba(255, 255, 255, 0.3)" />
            </TouchableOpacity>
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

          <View style={AppStyles.dockDivider}></View>

          {/* useMemo экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usememo')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="flash" size={24} color={activeScreen === 'usememo' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usememo' && AppStyles.dockTextActive]}>
              useMemo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return renderScreen();
}