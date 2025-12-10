import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  SafeAreaView,
  ScrollView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';
import { AppStyles } from './src/styles/AppStyles';

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
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={AppStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={AppStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={AppStyles.header}>
            <View style={AppStyles.titleContainer}>
              <View style={AppStyles.newYearBadge}>
                <Text style={AppStyles.newYearText}>🎄 2025</Text>
              </View>
            
            
            </View>
            <View style={AppStyles.badge}>
              <Text style={AppStyles.badgeText}>✨ Праздничная версия</Text>
            </View>
          </View>

          {/* Снежинки декоративные */}
          <View style={AppStyles.snowflakeContainer}>
            <Text style={AppStyles.snowflake}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake2]}>❄️</Text>
            <Text style={[AppStyles.snowflake, AppStyles.snowflake3]}>❄️</Text>
          </View>

          <View style={AppStyles.cardsContainer}>
            {/* UseState Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('usestate')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="snow" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>🎁</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useState</Text>
                    <Text style={AppStyles.cardDescription}>
                      Управление состоянием компонентов
                    </Text>
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseEffect Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('useeffect')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#0b490fff','#35aa3dff', '#2E8B57']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="sparkles" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>✨</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useEffect</Text>
                    <Text style={AppStyles.cardDescription}>
                      Побочные эффекты и жизненный цикл
                    </Text>
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* UseMemo Card */}
            <TouchableOpacity
              style={AppStyles.card}
              onPress={() => setScreen('usememo')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
                style={AppStyles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={AppStyles.cardContent}>
                  <View style={AppStyles.iconContainer}>
                    <View style={AppStyles.cardIcon}>
                      <Ionicons name="gift" size={28} color="white" />
                    </View>
                    <View style={AppStyles.cardDecor}>
                      <Text style={AppStyles.decorText}>🎄</Text>
                    </View>
                  </View>
                  <View style={AppStyles.textContainer}>
                    <Text style={AppStyles.cardTitle}>useMemo</Text>
                    <Text style={AppStyles.cardDescription}>
                      Оптимизация вычислений и производительности
                    </Text>
                    <Text style={AppStyles.cardHint}>Нажмите для демо →</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Новогоднее сообщение */}
          <View style={AppStyles.newYearMessage}>
            <Text style={AppStyles.messageTitle}>С Новым Годом!</Text>
           
          </View>

          
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  return renderScreen();
}