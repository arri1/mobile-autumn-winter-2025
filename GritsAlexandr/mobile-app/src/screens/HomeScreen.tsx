import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const routes = [
  { key: 'useState', title: 'useState', description: 'Локальное состояние' },
  { key: 'useEffect', title: 'useEffect', description: 'Побочные эффекты' },
  { key: 'useMemo', title: 'useMemo', description: 'Мемоизация значений' },
] as const;

const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Мобильные приложения</Text>
    <Text style={styles.subtitle}>
      Выберите хук, чтобы открыть экран с демонстрацией.
    </Text>

    {routes.map((route) => (
      <TouchableOpacity
        key={route.key}
        style={styles.card}
        onPress={() => navigation.navigate(route.key as keyof RootStackParamList)}
      >
        <Text style={styles.cardTitle}>{route.title}</Text>
        <Text style={styles.cardDescription}>{route.description}</Text>
        <Text style={styles.cardLink}>Открыть экран →</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  cardLink: {
    marginTop: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default HomeScreen;