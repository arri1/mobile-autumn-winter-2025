import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UseStateStyles } from '../styles/UseStateStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function UseStateScreen({ activeScreen, onNavigate }) {
  // useState для счетчика
  const [count, setCount] = useState(0);
  
  // useState для текста
  const [text, setText] = useState('SYSTEM_READY');
  
  // useState для редактируемого текста
  const [inputText, setInputText] = useState('');
  
  // useState для булевого значения
  const [useStateActive, setUseStateActive] = useState(false);
  
  // Анимация
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const textAnim = useRef(new Animated.Value(1)).current;

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    animateButton(scaleAnim);
  };

  const handleDecrement = () => {
    setCount(prev => Math.max(0, prev - 1));
    animateButton(scaleAnim);
  };

  const handleReset = () => {
    setCount(0);
  };

  const toggleText = () => {
    setText(prev => prev === 'SYSTEM_READY' ? 'SYSTEM_UNREADY' : 'SYSTEM_READY');
    animateButton(textAnim);
  };

  const handleTextInput = () => {
    if (inputText.trim()) {
      setText(inputText.toUpperCase());
      setInputText('');
      animateButton(textAnim);
    }
  };

  const toggleActive = () => {
    setUseStateActive(prev => !prev);
  };

  const animateButton = (animationRef) => {
    Animated.sequence([
      Animated.timing(animationRef, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationRef, {
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
            <View style={[UseStateStyles.card, { borderColor: 'rgba(0, 212, 255, 0.2)' }]}>
              <View style={UseStateStyles.cardHeader}>
                <View style={[UseStateStyles.cardIcon, { backgroundColor: 'rgba(0, 212, 255, 0.1)' }]}>
                  <Ionicons name="stats-chart" size={24} color="#00d4ff" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={[UseStateStyles.cardTitle, { color: '#00d4ff' }]}>DATA COUNTER</Text>
                  <Text style={UseStateStyles.cardDescription}>Numerical state management</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.counterDisplay}>
                <Text style={UseStateStyles.counterValue}>{count}</Text>
                <Text style={UseStateStyles.counterLabel}>UNITS ACTIVE</Text>
              </View>

              <View style={UseStateStyles.buttonGroup}>
                <TouchableOpacity 
                  style={[UseStateStyles.actionButton, { 
                    backgroundColor: 'rgba(255, 42, 109, 0.1)',
                    marginRight: 8,
                    marginLeft: 0,
                  }]}
                  onPress={handleDecrement}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={18} color="#ff2a6d" />
                  <Text style={[UseStateStyles.actionButtonText, { color: '#ff2a6d' }]}>DECREMENT</Text>
                </TouchableOpacity>
                
                <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
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
                  style={[UseStateStyles.actionButton, { 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    marginLeft: 8,
                    marginRight: 0,
                  }]}
                  onPress={handleReset}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={18} color="#ffffff" />
                  <Text style={[UseStateStyles.actionButtonText, { color: '#ffffff' }]}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Text State Card */}
          <View style={UseStateStyles.cardWrapper}>
            <View style={UseStateStyles.textCard}>
              <View style={UseStateStyles.cardHeader}>
                <View style={[UseStateStyles.cardIcon, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}>
                  <Ionicons name="text" size={24} color="#ff2a6d" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={[UseStateStyles.cardTitle, { color: '#ff2a6d' }]}>TEXT STATE</Text>
                  <Text style={UseStateStyles.cardDescription}>String state management</Text>
                </View>
              </View>
              
              <Animated.View style={{ 
                alignItems: 'center', 
                marginBottom: 20,
                transform: [{ scale: textAnim }] 
              }}>
                <View style={UseStateStyles.textDisplayContainer}>
                  <Text style={UseStateStyles.textValue}>{text}</Text>
                  <Text style={UseStateStyles.textStateLabel}>CURRENT STATE</Text>
                </View>
              </Animated.View>

              {/* Text Input Section */}
              <View style={UseStateStyles.inputContainer}>
                <Text style={UseStateStyles.inputLabel}>CUSTOM TEXT INPUT:</Text>
                <View style={UseStateStyles.inputRow}>
                  <TextInput
                    style={UseStateStyles.textInput}
                    placeholder="Enter custom text..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleTextInput}
                  />
                  <TouchableOpacity
                    style={UseStateStyles.setButton}
                    onPress={handleTextInput}
                    activeOpacity={0.8}
                    disabled={!inputText.trim()}
                  >
                    <Text style={[
                      UseStateStyles.setButtonText,
                      { color: inputText.trim() ? '#ff2a6d' : 'rgba(255, 42, 109, 0.5)' }
                    ]}>
                      SET
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={UseStateStyles.buttonGroup}>
                <TouchableOpacity 
                  style={[UseStateStyles.toggleButton, { flex: 1, marginRight: 8 }]}
                  onPress={toggleText}
                  activeOpacity={0.8}
                >
                  <View style={UseStateStyles.toggleButtonInner}>
                    <Ionicons name="swap-horizontal" size={18} color="#ff2a6d" />
                    <Text style={UseStateStyles.toggleButtonText}>TOGGLE</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[UseStateStyles.actionButton, { 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    marginLeft: 8,
                  }]}
                  onPress={() => {
                    setText('SYSTEM_READY');
                    setInputText('');
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={18} color="#ffffff" />
                  <Text style={[UseStateStyles.actionButtonText, { color: '#ffffff' }]}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Boolean State Card */}
          <View style={UseStateStyles.cardWrapper}>
            <View style={UseStateStyles.booleanCard}>
              <View style={UseStateStyles.cardHeader}>
                <View style={[UseStateStyles.cardIcon, { backgroundColor: 'rgba(0, 212, 255, 0.1)' }]}>
                  <Ionicons name="power" size={24} color="#00d4ff" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={[UseStateStyles.cardTitle, { color: '#00d4ff' }]}>BOOLEAN STATE</Text>
                  <Text style={UseStateStyles.cardDescription}>True/False state management</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.statusContainer}>
                <View style={[
                  UseStateStyles.booleanIndicator,
                  { 
                    backgroundColor: useStateActive ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: useStateActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)',
                  }
                ]}>
                  <Ionicons 
                    name={useStateActive ? "flash" : "flash-off"} 
                    size={40} 
                    color={useStateActive ? "#00d4ff" : "rgba(255, 255, 255, 0.5)"} 
                  />
                </View>
                <Text style={[
                  UseStateStyles.statusText,
                  { color: useStateActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.5)' }
                ]}>
                  {useStateActive ? 'SYSTEM ACTIVE' : 'SYSTEM STANDBY'}
                </Text>
              </View>

              <TouchableOpacity 
                style={UseStateStyles.booleanButton}
                onPress={toggleActive}
                activeOpacity={0.8}
              >
                <Text style={UseStateStyles.booleanButtonText}>
                  {useStateActive ? 'DEACTIVATE SYSTEM' : 'ACTIVATE SYSTEM'}
                </Text>
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
            onPress={() => onNavigate('home')}
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
            onPress={() => onNavigate('usestate')}
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
            onPress={() => onNavigate('useeffect')}
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
            onPress={() => onNavigate('usememo')}
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
}