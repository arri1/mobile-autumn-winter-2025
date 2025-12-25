import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  Switch,
  Animated,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');
const PIXEL_SIZE = 10;
const COLS = Math.floor(width / PIXEL_SIZE);
const ROWS = 40; // 40 * 30-40 = ~1200-1600 View элементов

// Вспомогательная функция для генерации цвета из хеша строки
const getColor = (seed: string, index: number) => {
  let hash = 0;
  const str = seed + index.toString();
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

export default function MemoizedMosaic() {
  // STATE 1: Редкое обновление (Seed)
  // Изменение этого стейта — тяжелая операция
  const [seed, setSeed] = useState('React Native');

  // STATE 2: Частое обновление (Сканер)
  // Этот стейт меняется 60 раз в секунду
  const [scannerPos, setScannerPos] = useState(0);

  // Переключатель "Защиты"
  const [isMemoEnabled, setIsMemoEnabled] = useState(true);

  // Анимация сканера
  useEffect(() => {
    let animationFrameId: number;
    let direction = 1;
    let pos = 0;

    const loop = () => {
      // Двигаем сканер туда-сюда
      pos += 2 * direction;
      if (pos > ROWS * PIXEL_SIZE || pos < 0) direction *= -1;
      
      setScannerPos(pos); // ВЫЗЫВАЕТ РЕРЕНДЕР ВСЕГО КОМПОНЕНТА!
      
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- НЕОБЫЧНАЯ ЧАСТЬ: useMemo возвращает JSX ---
  
  // Мы создаем переменную, которая хранит ГОТОВУЮ ВЕРСТКУ.
  // Она пересчитается, ТОЛЬКО если изменится `seed`.
  // Она ПРОИГНОРИРУЕТ изменения `scannerPos`.
  const heavyArtGrid = useMemo(() => {
    console.log('💎 ГЕНЕРАЦИЯ ТЯЖЕЛОЙ СЕТКИ...');
    const pixels = [];
    
    // Имитация тяжелой нагрузки: создаем тысячи вьюшек
    for (let i = 0; i < ROWS * COLS; i++) {
      pixels.push(
        <View
          key={i}
          style={{
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: getColor(seed, i),
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.1)'
          }}
        />
      );
    }

    return (
      <View style={styles.gridContainer}>
        {pixels}
      </View>
    );
  }, [seed]); // Зависимость ТОЛЬКО от seed

  // Вариант БЕЗ мемоизации (для сравнения тормозов)
  const renderSlowGrid = () => {
    // Тот же код, но запускается каждый кадр
    const pixels = [];
    for (let i = 0; i < ROWS * COLS; i++) {
        pixels.push(
          <View
            key={`slow-${i}`}
            style={{
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              backgroundColor: getColor(seed, i),
            }}
          />
        );
      }
      return <View style={styles.gridContainer}>{pixels}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мемоизация UI 💾</Text>
        <Text style={styles.subtitle}>
          Обычно useMemo кэширует данные. Здесь мы кэшируем 1200+ компонентов View.
        </Text>
        
        <View style={styles.controls}>
            <TextInput
                style={styles.input}
                value={seed}
                onChangeText={setSeed}
                placeholder="Введи что-нибудь..."
                placeholderTextColor="#666"
            />
        </View>

        <View style={styles.switchRow}>
            <Text style={{color: '#fff', marginRight: 10}}>
                Включить useMemo: {isMemoEnabled ? 'ON ✅' : 'OFF ❌'}
            </Text>
            <Switch 
                value={isMemoEnabled} 
                onValueChange={setIsMemoEnabled}
                trackColor={{false: '#444', true: '#00ff41'}}
            />
        </View>
        <Text style={styles.warning}>
            {isMemoEnabled 
                ? "Сканер плавный, так как сетка заморожена." 
                : "Тормоза! Сетка перерисовывается каждый кадр."}
        </Text>
      </View>

      <View style={styles.canvasArea}>
        {/* Рендерим либо кэшированный JSX, либо вызываем функцию заново */}
        {isMemoEnabled ? heavyArtGrid : renderSlowGrid()}

        {/* Сканер летает поверх */}
        <View 
            style={[
                styles.scannerLine, 
                { transform: [{ translateY: scannerPos }] }
            ]} 
        />
        <Text style={[styles.scannerText, { top: scannerPos - 20 }]}>
            SCANNING...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    backgroundColor: '#2b2b2b',
    zIndex: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 5,
    fontSize: 12,
  },
  controls: {
    marginTop: 15,
  },
  input: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  warning: {
    color: '#ff9f43',
    fontSize: 11,
    marginTop: 5,
    fontStyle: 'italic',
  },
  canvasArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden', // обрезаем сканер
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
  },
  scannerLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00ff41',
    shadowColor: "#00ff41",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 20,
  },
  scannerText: {
    position: 'absolute',
    right: 10,
    color: '#00ff41',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  }
});

