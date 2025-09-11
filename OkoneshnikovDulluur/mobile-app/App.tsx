import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Добро пожаловать 👋</Text>
        <Text style={styles.subtitle}>React Native + Expo стартовый проект</Text>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Открыть камеру (заглушка)</Text>
        </TouchableOpacity>

        <Text style={styles.helper}>
          Измените файл App.tsx, чтобы начать. Запустите: npm run ios / android / web
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
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#45A29E',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#0B0C10',
    fontWeight: '700',
    fontSize: 16,
  },
  helper: {
    color: '#C5C6C7',
  },
});
