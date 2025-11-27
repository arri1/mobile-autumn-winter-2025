import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Card, Button, H1, H2, Body, Caption } from '../../components/ui';
import useAuthStore from '../../store/authStore';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Container scrollable padding="md">
      <View style={styles.header}>
        <H1>Главная</H1>
        <Caption color="secondary">
          Минималистичное React Native приложение
        </Caption>
      </View>

      {/* Welcome Card */}
      <Card variant="outlined">
        <H2 style={styles.cardTitle}>
          {isAuthenticated ? `Добро пожаловать, ${user?.name}` : 'Добро пожаловать'}
        </H2>
        <Body color="secondary">
          Это демонстрационное приложение с минималистичным черно-белым дизайном.
        </Body>
      </Card>

      {/* Status Card */}
      <Card variant="outlined">
        <H2 style={styles.cardTitle}>Статус</H2>
        <View style={styles.statusRow}>
          <Caption color="secondary">Аутентификация</Caption>
          <Body weight="semibold">
            {isAuthenticated ? 'Авторизован' : 'Не авторизован'}
          </Body>
        </View>
        {isAuthenticated && (
          <>
            <View style={styles.divider} />
            <View style={styles.statusRow}>
              <Caption color="secondary">Пользователь</Caption>
              <Body>{user?.email}</Body>
            </View>
          </>
        )}
      </Card>

      {/* Navigation Card */}
      <Card variant="outlined">
        <H2 style={styles.cardTitle}>Быстрые действия</H2>
        <View style={styles.buttonStack}>
          {!isAuthenticated ? (
            <>
              <Button
                title="Войти"
                onPress={() => router.push('/auth/login')}
                variant="primary"
                size="lg"
              />
              <Button
                title="Зарегистрироваться"
                onPress={() => router.push('/auth/register')}
                variant="outline"
                size="md"
              />
            </>
          ) : (
            <Button
              title="Перейти в профиль"
              onPress={() => router.push('/auth/profile')}
              variant="outline"
              size="lg"
            />
          )}
        </View>
      </Card>

      {/* Features Card */}
      <Card variant="outlined">
        <H2 style={styles.cardTitle}>Особенности</H2>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Body color="secondary">Минималистичный черно-белый дизайн</Body>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Body color="secondary">Четкая визуальная иерархия</Body>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Body color="secondary">Оптимизированная читаемость</Body>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bullet} />
            <Body color="secondary">Адаптивные компоненты UI</Body>
          </View>
        </View>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 32,
    gap: 8,
  },
  cardTitle: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 8,
  },
  buttonStack: {
    gap: 12,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    marginTop: 8,
  },
});
