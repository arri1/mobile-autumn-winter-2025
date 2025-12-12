import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, Image as RNImage, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default function UseEffectExample() {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const imageBg = useThemeColor({ light: '#f0f0f0', dark: '#2C2C2E' }, 'background');

  const screenWidth = Dimensions.get('window').width - 32;
  const imageHeight = (screenWidth / 16) * 9;

  const fetchCatImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();
      setCatImage(data[0]);
      setFetchCount(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []); 

  useEffect(() => {
    if (fetchCount > 0) {
      console.log(`Загружено изображений кошек: ${fetchCount}`);
    }
  }, [fetchCount]);

  const handleLoadNewCat = () => {
    fetchCatImage();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Пример useEffect: тапалка котейек</ThemedText>
          <ThemedText style={styles.subtitle}>Загрузка данных из API</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoBox}>
          <ThemedText type="subtitle" style={styles.infoTitle}>Что происходит:</ThemedText>
          <ThemedText style={styles.infoText}>
            • useEffect загружает фото при открытии вкладки{'\n'}
            • useState хранит данные и состояние загрузки{'\n'}
            • API: thecatapi.com{'\n'}
            • Загружено фотографий: {fetchCount}
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.imageContainer, { height: imageHeight, backgroundColor: imageBg }]}>
          {loading ? (
            <View style={[styles.loadingContainer, { height: imageHeight }]}>
              <ActivityIndicator size="large" color="#007AFF" />
              <ThemedText style={styles.loadingText}>Загрузка котика...</ThemedText>
            </View>
          ) : error ? (
            <View style={[styles.errorContainer, { height: imageHeight }]}>
              <ThemedText style={styles.errorText}>❌ {error}</ThemedText>
              <TouchableOpacity style={styles.retryButton} onPress={handleLoadNewCat}>
                <ThemedText style={styles.buttonText}>Попробовать снова</ThemedText>
              </TouchableOpacity>
            </View>
          ) : catImage ? (
            <TouchableOpacity
              style={styles.catImageWrapper}
              onPress={handleLoadNewCat}
              activeOpacity={0.8}>
              <RNImage
                source={{ uri: catImage.url }}
                style={[styles.catImage, { width: screenWidth, height: imageHeight }]}
                resizeMode="contain"
              />
              <ThemedText style={styles.imageInfo}>
                ID: {catImage.id.substring(0, 8)}... • Формат 16:9
              </ThemedText>
              <View style={styles.tapHint}>
                <ThemedText style={styles.tapHintText}>👆 Нажми для новой кошки</ThemedText>
              </View>
            </TouchableOpacity>
          ) : null}
        </ThemedView>

        <ThemedView style={styles.stats}>
          <ThemedText style={styles.statsText}>
            Статистика:{'\n'}
            Состояние: {loading ? 'Загрузка' : 'Готово'}{'\n'}
            Ошибок: {error ? '1' : '0'}{'\n'}
            Всего загрузок: {fetchCount}
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
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 14,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 16,
  },
  infoTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  imageContainer: {
    minHeight: 300,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  catImageWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  catImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  imageInfo: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  codeTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  codeContent: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#d4d4d4',
  },
  stats: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  tapHint: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
  },
  tapHintText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});