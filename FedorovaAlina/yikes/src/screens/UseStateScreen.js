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
      colors={['#0A0A0A', '#1A1A2E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={28} color="white" />
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>useState</Text>
              <Text style={styles.headerSubtitle}>Управление состоянием</Text>
            </View>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Counter Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <Ionicons name="add-circle" size={24} color="#667EEA" />
                </View>
                <Text style={styles.cardTitle}>Счетчик</Text>
              </View>
              
              <View style={styles.counterDisplay}>
                <Text style={styles.counterValue}>{count}</Text>
                <Text style={styles.counterLabel}>текущее значение</Text>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.decrementButton]}
                  onPress={handleDecrement}
                  activeOpacity={0.8}
                >
                  <Ionicons name="remove" size={24} color="white" />
                  <Text style={styles.actionButtonText}>-1</Text>
                </TouchableOpacity>
                
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.incrementButton]}
                    onPress={handleIncrement}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.actionButtonText}>+1</Text>
                  </TouchableOpacity>
                </Animated.View>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.resetButton]}
                  onPress={() => setCount(0)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="refresh" size={24} color="white" />
                  <Text style={styles.actionButtonText}>Сброс</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Text Toggle Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(240, 147, 251, 0.1)', 'rgba(245, 87, 108, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <Ionicons name="text" size={24} color="#F093FB" />
                </View>
                <Text style={styles.cardTitle}>Переключение текста</Text>
              </View>
              
              <View style={styles.textDisplay}>
                <Text style={styles.textValue}>{text}</Text>
              </View>

              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setText(text === 'Привет!' ? 'Пока!' : 'Привет!')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#F093FB', '#F5576C']}
                  style={styles.toggleButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="swap-horizontal" size={20} color="white" />
                  <Text style={styles.toggleButtonText}>Сменить текст</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Boolean Toggle Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <Ionicons name="power" size={24} color="#4FACFE" />
                </View>
                <Text style={styles.cardTitle}>Булевый переключатель</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusIndicator,
                  isActive ? styles.activeIndicator : styles.inactiveIndicator
                ]}>
                  <Ionicons 
                    name={isActive ? "happy" : "sad"} 
                    size={48} 
                    color={isActive ? "#4FACFE" : "#8A8D93"} 
                  />
                </View>
                <Text style={styles.statusText}>
                  Статус: {isActive ? 'Активен 😄' : 'Неактивен 😭'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsActive(!isActive)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={isActive ? ['#4FACFE', '#00F2FE'] : ['#8A8D93', '#6C757D']}
                  style={styles.switchButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons 
                    name={isActive ? "toggle" : "toggle-outline"} 
                    size={20} 
                    color="white" 
                  />
                  <Text style={styles.switchButtonText}>
                    {isActive ? 'Выключить' : 'Включить'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 80,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  counterDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#667EEA',
    textShadowColor: 'rgba(102, 126, 234, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  counterLabel: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  incrementButton: {
    backgroundColor: '#667EEA',
  },
  decrementButton: {
    backgroundColor: '#F5576C',
  },
  resetButton: {
    backgroundColor: '#8A8D93',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textDisplay: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 24,
    alignItems: 'center',
  },
  textValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F093FB',
  },
  toggleButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  toggleButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusIndicator: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  activeIndicator: {
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
    borderWidth: 2,
    borderColor: '#4FACFE',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(138, 141, 147, 0.1)',
    borderWidth: 2,
    borderColor: '#8A8D93',
  },
  statusText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  switchButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  switchButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  switchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});