import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/AppStore';
import { UseEffectStyles } from '../styles/UseEffectStyles';
import { AppStyles } from '../styles/AppStyles';

const { width, height } = Dimensions.get('window');

export default function UseEffectScreen() {
  const { activeScreen, setActiveScreen } = useAppStore();
  
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const abortRef = useRef(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const fetchUser = async (id = userId) => {
    try {
      setLoading(true);
      setFetchError(null);
      const controller = new AbortController();
      abortRef.current = controller;
      
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        signal: controller.signal,
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      
      const json = await res.json();
      setUser(json);
      animateCard();
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Load error:', e);
        setFetchError('Failed to load data. Network request failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const animateCard = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    fetchUser();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [userId]);

  const [seconds, setSeconds] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s > 0 && s % 10 === 0) {
          const randomId = 1 + Math.floor(Math.random() * 10);
          setUserId(randomId);
        }
        return s + 1;
      });
    }, 1000);
    
    return () => clearInterval(id);
  }, [autoRefresh]);

  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('SYSTEM_GUEST_MODE');
  
  useEffect(() => {
    setGreeting(name ? `USER: ${name.toUpperCase()}` : 'SYSTEM_GUEST_MODE');
  }, [name]);

  const [clickCount, setClickCount] = useState(0);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (clickCount >= 5) {
      const fetchMultipleUsers = async () => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
          const data = await res.json();
          setUsersList(data);
        } catch (error) {
          console.error('List load error:', error);
        }
      };
      fetchMultipleUsers();
    }
  }, [clickCount]);

  return (
    <View style={UseEffectStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={UseEffectStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseEffectStyles.header}>
            <View style={UseEffectStyles.headerCenter}>
              <View style={UseEffectStyles.titleBadge}>
                <Text style={UseEffectStyles.titleBadgeText}>⌗ useEffect</Text>
              </View>
              <Text style={UseEffectStyles.headerSubtitle}>EFFECT MANAGEMENT</Text>
            </View>
          </View>

          {/* Разделительная линия */}
          <View style={UseEffectStyles.cyberLine} />

          {/* Error Card */}
          {fetchError && (
            <View style={UseEffectStyles.cardWrapper}>
              <Animated.View style={[UseEffectStyles.card, { borderColor: 'rgba(255, 42, 109, 0.3)' }]}>
                <View style={UseEffectStyles.cardHeader}>
                  <View style={[UseEffectStyles.cardIcon, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}>
                    <Ionicons name="warning" size={24} color="#ff2a6d" />
                  </View>
                  <View style={UseEffectStyles.cardTitleContainer}>
                    <Text style={[UseEffectStyles.cardTitle, { color: '#ff2a6d' }]}>ERROR</Text>
                    <Text style={UseEffectStyles.cardDescription}>Data fetch failed</Text>
                  </View>
                </View>
                <Text style={UseEffectStyles.errorMessage}>{fetchError}</Text>
                <View style={UseEffectStyles.buttonGroup}>
                  <TouchableOpacity 
                    style={[UseEffectStyles.actionButton, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}
                    onPress={() => fetchUser()}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="refresh" size={16} color="#ff2a6d" />
                    <Text style={[UseEffectStyles.actionButtonText, { color: '#ff2a6d' }]}>RETRY</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          )}

          {/* User Fetch Card */}
          <Animated.View style={[UseEffectStyles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
            <View style={UseEffectStyles.card}>
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="person" size={24} color="#00d4ff" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>USER DATA FETCH</Text>
                  <Text style={UseEffectStyles.cardDescription}>Effect on dependency change</Text>
                </View>
              </View>
              
              {loading ? (
                <View style={UseEffectStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#00d4ff" />
                  <Text style={UseEffectStyles.loadingText}>LOADING USER DATA...</Text>
                </View>
              ) : (
                <>
                  <View style={UseEffectStyles.userInfoContainer}>
                    {user ? (
                      <>
                        <Text style={UseEffectStyles.userName}>{user.name}</Text>
                        <View style={UseEffectStyles.userDetails}>
                          <View style={UseEffectStyles.userDetailItem}>
                            <Ionicons name="mail" size={16} color="#00d4ff" />
                            <Text style={UseEffectStyles.userDetailText}>{user.email}</Text>
                          </View>
                          <View style={UseEffectStyles.userDetailItem}>
                            <Ionicons name="location" size={16} color="#00d4ff" />
                            <Text style={UseEffectStyles.userDetailText}>{user.address?.city || 'Unknown'}</Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <Text style={UseEffectStyles.noDataText}>NO USER DATA FOUND</Text>
                    )}
                  </View>
                </>
              )}
              
              <View style={UseEffectStyles.buttonGroup}>
                <TouchableOpacity 
                  style={UseEffectStyles.actionButton}
                  onPress={() => {
                    const randomId = 1 + Math.floor(Math.random() * 10);
                    setUserId(randomId);
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="shuffle" size={16} color="#00d4ff" />
                  <Text style={UseEffectStyles.actionButtonText}>RANDOM USER</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => fetchUser()}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>REFRESH</Text>
                </TouchableOpacity>
              </View>

              <View style={UseEffectStyles.switchContainer}>
                <View style={UseEffectStyles.switchLabelContainer}>
                  <Ionicons name="refresh" size={18} color="#00d4ff" />
                  <Text style={UseEffectStyles.switchLabel}>Auto-refresh every 10s</Text>
                </View>
                <Switch
                  value={autoRefresh}
                  onValueChange={setAutoRefresh}
                  trackColor={{ false: '#2A2F3A', true: 'rgba(0, 212, 255, 0.3)' }}
                  thumbColor={autoRefresh ? '#00d4ff' : '#9AA4B2'}
                />
              </View>
            </View>
          </Animated.View>

          {/* Timer Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <View style={UseEffectStyles.card}>
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="timer" size={24} color="#ff2a6d" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>TIMER SYSTEM</Text>
                  <Text style={UseEffectStyles.cardDescription}>setInterval with cleanup</Text>
                </View>
              </View>
              
              <View style={UseEffectStyles.timerContainer}>
                <Text style={[UseEffectStyles.timerValue, { color: '#ff2a6d' }]}>{seconds}s</Text>
                <Text style={UseEffectStyles.timerLabel}>
                  Next user change in: {10 - (seconds % 10)}s
                </Text>
              </View>
              
              <View style={UseEffectStyles.buttonGroup}>
                <TouchableOpacity 
                  style={[UseEffectStyles.actionButton, { backgroundColor: 'rgba(255, 42, 109, 0.1)' }]}
                  onPress={() => setAutoRefresh((v) => !v)}
                  activeOpacity={0.8}
                >
                  <Ionicons name={autoRefresh ? "pause" : "play"} size={16} color="#ff2a6d" />
                  <Text style={[UseEffectStyles.actionButtonText, { color: '#ff2a6d' }]}>
                    {autoRefresh ? 'PAUSE' : 'START'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => setSeconds(0)}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Click Counter Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <View style={UseEffectStyles.card}>
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="code-slash" size={24} color="#00d4ff" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>CONDITIONAL FETCH</Text>
                  <Text style={UseEffectStyles.cardDescription}>Effect on condition</Text>
                </View>
              </View>
              
              <View style={UseEffectStyles.counterContainer}>
                <Text style={UseEffectStyles.counterValue}>{clickCount}</Text>
                <Text style={UseEffectStyles.counterLabel}>CLICK COUNT</Text>
              </View>
              
              {clickCount >= 5 && usersList.length > 0 && (
                <View style={UseEffectStyles.successContainer}>
                  <View style={UseEffectStyles.successHeader}>
                    <Ionicons name="checkmark-circle" size={24} color="#00d4ff" />
                    <Text style={UseEffectStyles.successTitle}>DATA FETCHED</Text>
                  </View>
                  <Text style={UseEffectStyles.successSubtitle}>User list loaded:</Text>
                  {usersList.map((u, index) => (
                    <View key={index} style={UseEffectStyles.userListItem}>
                      <Text style={UseEffectStyles.userListName}>{u.name}</Text>
                      <Text style={UseEffectStyles.userListEmail}>{u.email}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <View style={UseEffectStyles.buttonGroup}>
                <TouchableOpacity 
                  style={UseEffectStyles.actionButton}
                  onPress={() => setClickCount(c => c + 1)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={16} color="#00d4ff" />
                  <Text style={UseEffectStyles.actionButtonText}>INCREMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => setClickCount(0)}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Greeting Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <View style={UseEffectStyles.card}>
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="chatbubble" size={24} color="#ff2a6d" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>DYNAMIC GREETING</Text>
                  <Text style={UseEffectStyles.cardDescription}>Effect on state change</Text>
                </View>
              </View>
              
              <TextInput
                style={UseEffectStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter username..."
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
              />
              
              <View style={UseEffectStyles.greetingContainer}>
                <Ionicons name="terminal" size={24} color="#00d4ff" />
                <Text style={UseEffectStyles.greetingText}>{greeting}</Text>
              </View>
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