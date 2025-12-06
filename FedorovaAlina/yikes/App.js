import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';

const { width } = Dimensions.get('window');

export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch (screen) {
      case 'usestate':
        return <UseStateScreen goBack={() => setScreen('home')} />;
      case 'useeffect':
        return <UseEffectScreen goBack={() => setScreen('home')} />;
      case 'usememo':
        return <UseMemoScreen goBack={() => setScreen('home')} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <LinearGradient
      colors={['#0A0A0A', '#1A1A2E', '#16213E']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.subtitle}>React Native</Text>
              <Text style={styles.title}>Hooks Demo</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Modern UI</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            {/* UseState Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => setScreen('usestate')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="stats-chart" size={32} color="white" />
                </View>
                <Text style={styles.cardTitle}>useState</Text>
                <Text style={styles.cardDescription}>
                  Управление состоянием компонента
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardHint}>Нажмите для демонстрации →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseEffect Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => setScreen('useeffect')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F093FB', '#F5576C']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="sync" size={32} color="white" />
                </View>
                <Text style={styles.cardTitle}>useEffect</Text>
                <Text style={styles.cardDescription}>
                  Побочные эффекты и жизненный цикл
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardHint}>Нажмите для демонстрации →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseMemo Card */}
            <TouchableOpacity
              style={styles.card}
              onPress={() => setScreen('usememo')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4FACFE', '#00F2FE']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="speedometer" size={32} color="white" />
                </View>
                <Text style={styles.cardTitle}>useMemo</Text>
                <Text style={styles.cardDescription}>
                  Оптимизация вычислений
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardHint}>Нажмите для демонстрации →</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Выберите хук для демонстрации</Text>
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8D93',
    fontWeight: '500',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    color: '#8A8D93',
    fontSize: 12,
    fontWeight: '600',
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    height: 160,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cardHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#8A8D93',
    fontSize: 14,
    marginBottom: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeDot: {
    backgroundColor: '#667EEA',
  },
});