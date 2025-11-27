import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function AboutScreen() {
  const { actualColorScheme, toggleTheme } = useTheme();
  const buttonBg = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.mainTitle}>
            О приложении
          </ThemedText>
          <View style={styles.divider} />

          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: buttonBg }]}
            onPress={toggleTheme}
            activeOpacity={0.7}>
            <ThemedText style={styles.themeButtonText}>
              {actualColorScheme === 'dark' ? '☀️' : '🌙'}
              {' '}
              {actualColorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <View style={styles.photoContainer}>
            <Image
              source={require('@/assets/images/profile.jpg')}
              style={styles.profilePhoto}
            />
          </View>

          <ThemedText type="subtitle" style={styles.name}>
            Васильев Харысхан
          </ThemedText>

          <ThemedText style={styles.info}>
            ФИИТ-22
          </ThemedText>
        </ThemedView>

        {/* Project Info */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            О проекте
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Данное приложение разработано в рамках изучения дисциплины
            "Разработка мобильных приложений" в Северо-Восточном федеральном
            университете имени М.К. Аммосова.
          </ThemedText>
        </ThemedView>

        {/* Features */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Функционал
          </ThemedText>
          <ThemedView style={styles.featuresList}>
            <ThemedView style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🎨</ThemedText>
              <ThemedView style={styles.featureTextContainer}>
                <ThemedText style={styles.featureTitle}>useState</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Интерактивное рисование пальцем с выбором цвета и размера кисти
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🐱</ThemedText>
              <ThemedView style={styles.featureTextContainer}>
                <ThemedText style={styles.featureTitle}>useEffect</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Загрузка случайных фотографий кошек из API в формате 16:9
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Technologies */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Технологии
          </ThemedText>
          <ThemedView style={styles.techGrid}>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>React Native</ThemedText>
            </View>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>TypeScript</ThemedText>
            </View>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>Expo</ThemedText>
            </View>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>React Hooks</ThemedText>
            </View>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>SVG</ThemedText>
            </View>
            <View style={styles.techBadge}>
              <ThemedText style={styles.techText}>Gestures</ThemedText>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Contact */}
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Контакты
          </ThemedText>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Университет:</ThemedText>
            <ThemedText style={styles.contactValue}>СВФУ им. М.К. Аммосова</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Факультет:</ThemedText>
            <ThemedText style={styles.contactValue}>ФИИиТ</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Группа:</ThemedText>
            <ThemedText style={styles.contactValue}>ФИИТ-22</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Телеграм:</ThemedText>
            <ThemedText style={styles.contactValue}>https://t.me/DartGrid</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>GitHub:</ThemedText>
            <ThemedText style={styles.contactValue}>Dartgrid</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Footer */}
        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            © 2025 • Разработка мобильных приложений
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Сделано в Якутске
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 32,
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  themeButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#E5E5EA',
  },
  profilePhoto: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    opacity: 0.7,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  techText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  contactLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
});