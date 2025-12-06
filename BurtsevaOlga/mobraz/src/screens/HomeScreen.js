import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import { styles } from '../styles/HomeScreen.styles.js';
import { useAuthStore } from '../store/authStore.js';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>React Hooks</Text>

          <Text style={styles.welcomeText}>
            Привет, {user?.name || 'Гость'}!
          </Text>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.icon, { backgroundColor: '#AF52DE' }]}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>Профиль</Text>
                <Text style={styles.buttonDescription}>
                  Просмотр и управление аккаунтом
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
          
          {/* Карточка с информацией */}
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Выберите хук для изучения примеров:
            </Text>
          </View>
          
          {/* Кнопка для useState */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('UseState')}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.icon, { backgroundColor: '#007AFF' }]}>
                <Text style={styles.iconText}>1</Text>
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>useState</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Кнопка для useEffect */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('UseEffect')}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.icon, { backgroundColor: '#34C759' }]}>
                <Text style={styles.iconText}>2</Text>
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>useEffect</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>

          {/* Кнопка для useMemo */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('UseMemo')}
          >
            <View style={styles.buttonContent}>
              <View style={[styles.icon, { backgroundColor: '#FF9500' }]}>
                <Text style={styles.iconText}>3</Text>
              </View>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonTitle}>useMemo</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>


          

          {/* Разделитель */}
          <View style={styles.divider} />
          
          {/* Информация */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Каждый хук имеет практические примеры
            </Text>
            <Text style={styles.footerSubtext}>
              Нажмите на интересующий вас хук
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;