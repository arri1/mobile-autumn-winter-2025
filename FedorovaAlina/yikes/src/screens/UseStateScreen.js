import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/AppStore';
import { useAuthStore } from '../store/authStore';
import { UseStateStyles } from '../styles/UseStateStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function UseStateScreen() {
  const { 
    count, 
    useStateText, 
    useStateActive, 
    activeScreen,
    incrementCount, 
    decrementCount, 
    resetCount, 
    toggleUseStateText, 
    toggleUseStateActive,
  } = useAppStore();
  
  const { setActiveScreen } = useAuthStore();
  
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleIncrement = () => {
    incrementCount();
    animateButton();
  };

  const handleDecrement = () => {
    decrementCount();
    animateButton();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={UseStateStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={UseStateStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseStateStyles.header}>
            <View style={UseStateStyles.headerCenter}>
              <View style={UseStateStyles.titleBadge}>
                <Text style={UseStateStyles.titleBadgeText}>⌗ useState</Text>
              </View>
              <Text style={UseStateStyles.headerSubtitle}>STATE MANAGEMENT</Text>
            </View>
          </View>

          {/* Разделительная линия */}
          <View style={UseStateStyles.cyberLine} />

          {/* Counter Card */}
          <View style={UseStateStyles.cardWrapper}>
            <View style={UseStateStyles.card}>
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="stats-chart" size={24} color="#00d4ff" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>DATA COUNTER</Text>
                  <Text style={UseStateStyles.cardDescription}>Numerical state management</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.counterDisplay}>
                <Text style={UseStateStyles.counterValue}>{count}</Text>
                <Text style={UseStateStyles.counterLabel}>UNITS ACTIVE</Text>
              </View>

              <View style={UseStateStyles.buttonGroup}>
                <TouchableOpacity 
                  style={UseStateStyles.actionButton}
                  onPress={handleDecrement}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={18} color="#ffffff" />
                  <Text style={UseStateStyles.actionButtonText}>DECREMENT</Text>
                </TouchableOpacity>
                
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity 
                    style={UseStateStyles.actionButton}
                    onPress={handleIncrement}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={18} color="#00d4ff" />
                    <Text style={UseStateStyles.actionButtonText}>INCREMENT</Text>
                  </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity 
                  style={UseStateStyles.actionButton}
                  onPress={resetCount}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={18} color="#ffffff" />
                  <Text style={UseStateStyles.actionButtonText}>RESET SYSTEM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Text Toggle Card */}
          <View style={UseStateStyles.cardWrapper}>
            <View style={UseStateStyles.card}>
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="text" size={24} color="#00d4ff" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>TEXT STATE</Text>
                  <Text style={UseStateStyles.cardDescription}>String state management</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.textDisplay}>
                <Text style={UseStateStyles.textValue}>{useStateText}</Text>
              </View>

              <TouchableOpacity
                style={UseStateStyles.toggleButton}
                onPress={toggleUseStateText}
                activeOpacity={0.8}
              >
                <View style={UseStateStyles.toggleButtonInner}>
                  <Ionicons name="swap-horizontal" size={16} color="#00d4ff" />
                  <Text style={UseStateStyles.toggleButtonText}>TOGGLE STATE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Boolean Toggle Card */}
          <View style={UseStateStyles.cardWrapper}>
            <View style={UseStateStyles.card}>
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="power" size={24} color="#00d4ff" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>SYSTEM STATUS</Text>
                  <Text style={UseStateStyles.cardDescription}>Boolean state management</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.statusContainer}>
                <View style={UseStateStyles.statusIndicator}>
                  <Ionicons 
                    name={useStateActive ? "flash" : "flash-off"} 
                    size={40} 
                    color={useStateActive ? "#00d4ff" : "#ffffff"} 
                  />
                </View>
                <Text style={UseStateStyles.statusText}>
                  {useStateActive ? 'SYSTEM ACTIVE' : 'SYSTEM STANDBY'}
                </Text>
              </View>

              <TouchableOpacity
                style={UseStateStyles.toggleButton}
                onPress={toggleUseStateActive}
                activeOpacity={0.8}
              >
                <View style={UseStateStyles.toggleButtonInner}>
                  <Ionicons 
                    name={useStateActive ? "toggle" : "toggle-outline"} 
                    size={16} 
                    color="#00d4ff" 
                  />
                  <Text style={UseStateStyles.toggleButtonText}>
                    {useStateActive ? 'DEACTIVATE' : 'ACTIVATE'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Пробел для нижней навигации */}
          <View style={AppStyles.bottomSpacer}></View>
        </ScrollView>
      </SafeAreaView>

      {/* Нижняя док-панель для навигации */}
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

          {/* Разделитель */}
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

          {/* Разделитель */}
          <View style={AppStyles.dockDivider}></View>

          {/* Profile экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('profile')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="person" size={24} color={activeScreen === 'profile' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'profile' && AppStyles.dockTextActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}