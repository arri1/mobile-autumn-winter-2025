import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// 1. Типизация наших объектов
interface Plant {
  id: string;
  x: number;
  y: number;
  emoji: string;
  scale: number;
  rotation: number;
}

// Набор для случайной генерации
const EMOJIS = ['🌿', '🍄', '🌷', '🌵', '🌻', '🪨', '🎋'];

export default function TimeTravelGarden() {
  // 2. НЕОБЫЧНЫЙ STATE:
  // Мы храним массив массивов (историю всех состояний)
  // timeline[0] - пустое поле
  // timeline[1] - поле с 1 цветком
  // timeline[2] - поле с 2 цветками и т.д.
  const [timeline, setTimeline] = useState<Plant[][]>([[]]);
  
  // Индекс текущего момента времени, который мы видим на экране
  const [timeIndex, setTimeIndex] = useState<number>(0);

  // Текущее состояние для рендера (вычисляемое, но мгновенное)
  const currentGarden = timeline[timeIndex];

  // Логика добавления нового элемента
  const handlePressField = (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent;

    const newPlant: Plant = {
      id: Date.now().toString(),
      x: locationX,
      y: locationY,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      scale: 0.8 + Math.random() * 1.5, // Случайный размер
      rotation: Math.floor(Math.random() * 360), // Случайный поворот
    };

    // 3. МАГИЯ ИСТОРИИ:
    // Если мы были в прошлом (сделали Undo) и кликаем сейчас,
    // мы "отрезаем" будущее и создаем новую ветку реальности.
    const historyUpToNow = timeline.slice(0, timeIndex + 1);
    const currentFrame = historyUpToNow[historyUpToNow.length - 1];
    
    // Создаем новый кадр истории
    const nextFrame = [...currentFrame, newPlant];
    
    // Обновляем линию времени
    const newTimeline = [...historyUpToNow, nextFrame];
    
    setTimeline(newTimeline);
    setTimeIndex(newTimeline.length - 1); // Перемещаемся в самый конец
  };

  // Путешествие назад
  const undo = () => {
    if (timeIndex > 0) setTimeIndex(prev => prev - 1);
  };

  // Путешествие вперед
  const redo = () => {
    if (timeIndex < timeline.length - 1) setTimeIndex(prev => prev + 1);
  };

  // Прыжок во времени (для слайдера)
  const jumpToTime = (val: number) => {
    setTimeIndex(Math.floor(val));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Сад Времени ⏳</Text>
        <Text style={styles.subtitle}>
          Тапай по экрану. Используй слайдер для перемотки прошлого.
        </Text>
      </View>

      {/* Интерактивная область сада */}
      <Pressable style={styles.gardenArea} onPress={handlePressField}>
        {/* Рендерим только то, что существует в текущем timeIndex */}
        {currentGarden.map((plant) => (
          <View
            key={plant.id}
            style={[
              styles.plantContainer,
              {
                left: plant.x - 20, // центрируем по касанию
                top: plant.y - 20,
                transform: [
                  { scale: plant.scale },
                  { rotate: `${plant.rotation}deg` }
                ]
              }
            ]}
          >
            <Text style={styles.emoji}>{plant.emoji}</Text>
          </View>
        ))}
        
        {currentGarden.length === 0 && (
          <Text style={styles.placeholder}>Коснитесь, чтобы посадить...</Text>
        )}
      </Pressable>

      {/* Панель управления временем */}
      <View style={styles.controlPanel}>
        <View style={styles.stats}>
          <Text style={styles.statText}>Момент: {timeIndex} / {timeline.length - 1}</Text>
          <Text style={styles.statText}>Объектов: {currentGarden.length}</Text>
        </View>

        {/* Слайдер времени (нужен пакет) или имитация */}
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={Math.max(timeline.length - 1, 1)}
          value={timeIndex}
          onValueChange={jumpToTime}
          minimumTrackTintColor="#7F5AF0"
          maximumTrackTintColor="#000000"
          step={1}
        />

        <View style={styles.buttonsRow}>
          <TouchableOpacity 
            onPress={undo} 
            style={[styles.btn, timeIndex === 0 && styles.btnDisabled]}
            disabled={timeIndex === 0}
          >
            <Text style={styles.btnText}>⏪ Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setTimeIndex(0)} 
            style={[styles.btn, styles.btnDestruct]}
          >
            <Text style={styles.btnText}>🔥 Сжечь все</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={redo} 
            style={[styles.btn, timeIndex === timeline.length - 1 && styles.btnDisabled]}
            disabled={timeIndex === timeline.length - 1}
          >
            <Text style={styles.btnText}>Redo ⏩</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
  },
  header: {
    padding: 20,
    backgroundColor: '#242629',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7F5AF0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fffffe',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#94a1b2',
    textAlign: 'center',
  },
  gardenArea: {
    flex: 1,
    backgroundColor: '#16161a',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholder: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    color: '#72757e',
    fontSize: 18,
    fontStyle: 'italic',
  },
  plantContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // Тень для объема
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  emoji: {
    fontSize: 30,
  },
  controlPanel: {
    height: 160,
    backgroundColor: '#242629',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statText: {
    color: '#94a1b2',
    fontFamily: 'monospace',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#7F5AF0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  btnDestruct: {
    backgroundColor: '#ef4565',
  },
  btnDisabled: {
    backgroundColor: '#72757e',
    opacity: 0.5,
  },
  btnText: {
    color: '#fffffe',
    fontWeight: 'bold',
  },
});