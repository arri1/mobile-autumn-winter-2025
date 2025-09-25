import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [buttonPressCount, setButtonPressCount] = useState<number>(0);

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
      <View style={styles.container}>
        <Text style={styles.title}>Добро пожаловать 👋</Text>
        <Text style={styles.subtitle}>Expo + React Native с useState</Text>

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

        <Text style={styles.helper}>
          Запустите: npx expo start
        </Text>

        <StatusBar style="auto" />
      </View>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
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
    color: '#66FCF1',
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
    backgroundColor: '#45A29E',
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
    backgroundColor: '#45A29E',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'stretch',
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
  helper: {
    color: '#C5C6C7',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});