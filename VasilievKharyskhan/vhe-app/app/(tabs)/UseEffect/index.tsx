import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image as RNImage, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from "./_styles";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
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
  const imageHeight =Dimensions.get('window').height *0.7;
  const screenWidth =  Dimensions.get('window').width - 32;


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
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.title}>Пример useEffect: тапалка котейек</ThemedText>
            <ThemedText style={styles.subtitle}>Загрузка данных из API</ThemedText>
          </ThemedView>

          <ThemedView style={styles.infoBox}>
            <ThemedText style={styles.infoTitle}>Что происходит:</ThemedText>
            <ThemedText style={styles.infoText}>
              • useEffect загружает фото при открытии вкладки{'\n'}
              • useState хранит данные и состояние загрузки{'\n'}
              • API: thecatapi.com{'\n'}
              • Загружено фотографий: {fetchCount}
            </ThemedText>
          </ThemedView>

          <ThemedView style={[styles.imageContainer, { height: imageHeight, backgroundColor: imageBg }]}>
            {loading ? (
              <ThemedView style={[styles.loadingContainer, { height: imageHeight }]}>
                <ActivityIndicator size="large" color="#007AFF" />
                <ThemedText style={styles.loadingText}>Загрузка котика...</ThemedText>
              </ThemedView>
            ) : error ? (
              <ThemedView style={[styles.errorContainer, { height: imageHeight }]}>
                <ThemedText style={styles.errorText}>❌ {error}</ThemedText>
                <TouchableOpacity style={styles.retryButton} onPress={handleLoadNewCat}>
                  <ThemedText style={styles.buttonText}>Попробовать снова</ThemedText>
                </TouchableOpacity>
              </ThemedView>
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
                <ThemedView style={styles.tapHint}>
                  <ThemedText style={styles.tapHintText}>👆 Нажми для новой кошки</ThemedText>
                </ThemedView>
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
    </ThemedView>
  );
}