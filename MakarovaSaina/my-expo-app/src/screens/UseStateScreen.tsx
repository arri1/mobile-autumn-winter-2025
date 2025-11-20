import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native';

export default function UseStateScreen({ navigation }: any) {
  const [count, setCount] = useState(0);
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const incrementCount = (): void => {
    setCount(count + 1);
  };

  const decrementCount = (): void => {
    setCount(count - 1);
  };

  const resetCount = (): void => {
    setCount(0);
  };

  const handlePrimaryButtonPress = (): void => {
    const newPressCount = buttonPressCount + 1;
    setButtonPressCount(newPressCount);
    Alert.alert('Уведомление', `Кнопка нажата ${newPressCount} раз(а)!`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>useState 🎣</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterTitle}>Счетчик: {count}</Text>
          <View style={styles.counterButtons}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={decrementCount}
              activeOpacity={0.7}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={resetCount}
              activeOpacity={0.7}
            >
              <Text style={styles.counterButtonText}>Сбросить</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={incrementCount}
              activeOpacity={0.7}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handlePrimaryButtonPress}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>
            Нажми меня ({buttonPressCount})
          </Text>
        </TouchableOpacity>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('UseEffect')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>→ Перейти к useEffect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('UseMemo')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>→ Перейти к useMemo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    marginBottom: 32,
    textAlign: 'center',
  },
  counterContainer: {
    backgroundColor: '#1F2833',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  counterTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  counterButton: {
    flex: 1,
    backgroundColor: '#ff859bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#ff859bff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#0B0C10',
    fontWeight: '700',
    fontSize: 16,
  },
  navigationButtons: {
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2D3748',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  navButtonText: {
    color: '#66FCF1',
    fontWeight: '600',
    fontSize: 14,
  },
});