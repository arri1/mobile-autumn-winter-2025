import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UseStateStyles } from '../styles/UseStateStyles';

export default function UseStateScreen({ goBack }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Привет!');
  const [isActive, setIsActive] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleIncrement = () => {
    setCount(count + 1);
    animateButton();
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      animateButton();
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
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
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={UseStateStyles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={UseStateStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseStateStyles.header}>
            <TouchableOpacity 
              style={UseStateStyles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={UseStateStyles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={UseStateStyles.headerCenter}>
              <View style={UseStateStyles.titleBadge}>
                <Text style={UseStateStyles.titleBadgeText}>🎁 useState</Text>
              </View>
              <Text style={UseStateStyles.headerSubtitle}>Управление состоянием</Text>
            </View>
            <View style={UseStateStyles.headerPlaceholder} />
          </View>

          {/* Декоративные снежинки */}
          <View style={UseStateStyles.snowflakeContainer}>
            <Text style={UseStateStyles.snowflake}>❄️</Text>
            <Text style={[UseStateStyles.snowflake, UseStateStyles.snowflake2]}>❄️</Text>
            <Text style={[UseStateStyles.snowflake, UseStateStyles.snowflake3]}>❄️</Text>
          </View>

          {/* Counter Card */}
          <View style={UseStateStyles.cardWrapper}>
            <LinearGradient
              colors={['#800707ff', '#D32F2F', '#B30000']}
              style={UseStateStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="gift" size={28} color="white" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>Счетчик подарков</Text>
                  <Text style={UseStateStyles.cardDescription}>Управление числовым состоянием</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.counterDisplay}>
                <Text style={UseStateStyles.counterValue}>{count}</Text>
                <Text style={UseStateStyles.counterLabel}>Количество подарков</Text>
              </View>

              <View style={UseStateStyles.buttonGroup}>
                <TouchableOpacity 
                  style={[UseStateStyles.actionButton, UseStateStyles.decrementButton]}
                  onPress={handleDecrement}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={22} color="white" />
                  <Text style={UseStateStyles.actionButtonText}>Забрать подарок</Text>
                </TouchableOpacity>
                
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity 
                    style={[UseStateStyles.actionButton, UseStateStyles.incrementButton]}
                    onPress={handleIncrement}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={22} color="white" />
                    <Text style={UseStateStyles.actionButtonText}>Добавить подарок</Text>
                  </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity 
                  style={[UseStateStyles.actionButton, UseStateStyles.resetButton]}
                  onPress={() => setCount(0)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={22} color="white" />
                  <Text style={UseStateStyles.actionButtonText}>Раздать всё</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Text Toggle Card */}
          <View style={UseStateStyles.cardWrapper}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={UseStateStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="chatbubble" size={28} color="white" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>Праздничные поздравления</Text>
                  <Text style={UseStateStyles.cardDescription}>Управление текстовым состоянием</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.textDisplay}>
                <Text style={UseStateStyles.textValue}>{text}</Text>
                <Text style={UseStateStyles.textEmoji}>{text === 'Привет!' ? '🎅' : '🎄'}</Text>
              </View>

              <TouchableOpacity
                style={UseStateStyles.toggleButton}
                onPress={() => setText(text === 'Привет!' ? 'С Новым Годом!' : 'Привет!')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#0b490fff','#35aa3dff']}
                  style={UseStateStyles.toggleButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="swap-horizontal" size={20} color="white" />
                  <Text style={UseStateStyles.toggleButtonText}>Сменить поздравление</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Boolean Toggle Card */}
          <View style={UseStateStyles.cardWrapper}>
            <LinearGradient
              colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
              style={UseStateStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseStateStyles.cardHeader}>
                <View style={UseStateStyles.cardIcon}>
                  <Ionicons name="snow" size={28} color="white" />
                </View>
                <View style={UseStateStyles.cardTitleContainer}>
                  <Text style={UseStateStyles.cardTitle}>Праздничное настроение</Text>
                  <Text style={UseStateStyles.cardDescription}>Управление булевым состоянием</Text>
                </View>
              </View>
              
              <View style={UseStateStyles.statusContainer}>
                <View style={[
                  UseStateStyles.statusIndicator,
                  isActive ? UseStateStyles.activeIndicator : UseStateStyles.inactiveIndicator
                ]}>
                  <Ionicons 
                    name={isActive ? "happy" : "sad"} 
                    size={52} 
                    color="white" 
                  />
                  <Text style={UseStateStyles.statusEmoji}>
                    {isActive ? '🎉✨' : '❄️☃️'}
                  </Text>
                </View>
                <Text style={UseStateStyles.statusText}>
                  {isActive ? 'Праздник в самом разгаре! 🎄' : 'Готовимся к празднику ⛄'}
                </Text>
              </View>

              <TouchableOpacity
                style={UseStateStyles.switchButton}
                onPress={() => setIsActive(!isActive)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isActive ? ['#2166ceff', '#0d335eff'] : ['#8A8D93', '#6C757D']}
                  style={UseStateStyles.switchButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons 
                    name={isActive ? "toggle" : "toggle-outline"} 
                    size={20} 
                    color="white" 
                  />
                  <Text style={UseStateStyles.switchButtonText}>
                    {isActive ? 'Выключить праздник' : 'Включить праздник'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

       

          
            
            
          
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}