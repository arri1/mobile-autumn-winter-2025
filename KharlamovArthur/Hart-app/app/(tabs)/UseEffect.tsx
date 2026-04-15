import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Vibration,
  Animated,
} from 'react-native';

// Набор символов для "заражения" текста
const GLITCH_CHARS = ['$', '%', '#', '@', '&', '!', '?', '0', '1', '☠️', '⚡', ' '];

export default function EntropyWriter() {
  // Исходный текст (чистый)
  const [originalText, setOriginalText] = useState('');
  // Отображаемый текст (гниющий)
  const [displayText, setDisplayText] = useState('');
  // Статус: если true, энтропия активна
  const [isDecaying, setIsDecaying] = useState(false);
  
  // Анимация для визуального эффекта (дрожание)
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // 1. ЭФФЕКТ НАБЛЮДАТЕЛЯ (Debounce)
  // Следит за вводом. Если пользователь печатает, мы "лечим" текст.
  // Если пользователь замер на 1 секунду — запускаем распад.
  useEffect(() => {
    // При каждом изменении оригинала обновляем экран и останавливаем распад
    setDisplayText(originalText);
    setIsDecaying(false);

    const timer = setTimeout(() => {
      if (originalText.length > 0) {
        setIsDecaying(true); // Запуск хаоса через 1 сек бездействия
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [originalText]);

  // 2. ЭФФЕКТ ЭНТРОПИИ (Autonomous Agent)
  // Это "сердце" хаоса. Оно работает само по себе, когда isDecaying = true.
  useEffect(() => {
    if (!isDecaying) return;

    // Интервал "тиков" распада (каждые 100мс)
    const intervalId = setInterval(() => {
      setDisplayText((currentText) => {
        // Если текст пуст или полностью уничтожен
        if (currentText.length === 0) return currentText;

        // Превращаем строку в массив для мутации
        const chars = currentText.split('');
        
        // Шанс мутации зависит от длины, но давайте сделаем агрессивно
        // Меняем 1 случайный символ за тик
        const randomIndex = Math.floor(Math.random() * chars.length);
        
        // 10% шанс удалить символ, 90% шанс заменить на мусор
        if (Math.random() > 0.9) {
           chars.splice(randomIndex, 1); // Удаление (бит-рот)
        } else {
           chars[randomIndex] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }

        // Визуальный эффект дрожания при "повреждении"
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
        ]).start();

        // Если текст стал слишком коротким, останавливаем (или вибрируем от смерти текста)
        if (chars.length < originalText.length / 2) {
             Vibration.vibrate(50); // Легкая вибрация при сильном распаде
        }

        return chars.join('');
      });
    }, 150); // Скорость гниения

    // Важнейшая часть: очистка интервала при размонтировании или остановке распада
    return () => clearInterval(intervalId);
  }, [isDecaying, originalText.length, shakeAnim]); // Зависимости

  
  // Функция "Лечения" вручную
  const stabilize = () => {
    setDisplayText(originalText);
    setIsDecaying(false);
    // Снова запустим таймер через useEffect[originalText] не получится напрямую,
    // но мы можем просто обновить originalText "вхолостую" или просто сбросить таймер логикой.
    // В данном примере просто нажатие сбрасывает визуализацию до следующего тика таймера.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Введи данные (и не останавливайся...)</Text>
        
        {/* Поле ввода скрыто или прозрачно, мы видим только результат */}
        <TextInput
          style={styles.hiddenInput}
          value={originalText}
          onChangeText={setOriginalText}
          autoFocus
          placeholder="Печатай здесь..."
          placeholderTextColor="#555"
        />

        {/* Визуализация с анимацией */}
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
            <Text style={[
                styles.glitchText, 
                isDecaying ? styles.textRotting : styles.textStable
            ]}>
            {displayText || "Waiting for signal..."}
            </Text>
        </Animated.View>

        <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
                STATUS: {isDecaying ? "⚠️ CORRUPTION DETECTED" : "✅ STABLE"}
            </Text>
            {isDecaying && (
                <TouchableOpacity onPress={stabilize} style={styles.repairBtn}>
                    <Text style={styles.repairBtnText}>REPAIR SIGNAL</Text>
                </TouchableOpacity>
            )}
        </View>

        <Text style={styles.desc}>
            Этот экран использует <Text style={styles.code}>useEffect</Text> как таймер энтропии. 
            Один эффект ждет паузы, второй эффект уничтожает состояние.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d', // Cyberpunk dark
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    color: '#00ff41', // Matrix green
    marginBottom: 20,
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  hiddenInput: {
    height: 40,
    width: '100%',
    position: 'absolute',
    opacity: 0, // Скрываем реальный инпут, пользователь печатает "в воздух"
    zIndex: 10, // Но он должен быть сверху, чтобы ловить тапы
  },
  glitchText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace', // Важно для стиля терминала
    minHeight: 100,
  },
  textStable: {
    color: '#ffffff',
    textShadowColor: '#00ff41',
    textShadowRadius: 10,
  },
  textRotting: {
    color: '#ff0055', // Cyberpunk red/pink
    textShadowColor: '#ff0000',
    textShadowRadius: 20,
  },
  statusContainer: {
    marginTop: 50,
    height: 100,
    alignItems: 'center',
  },
  statusText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  repairBtn: {
    borderColor: '#00ff41',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 255, 65, 0.1)',
  },
  repairBtnText: {
    color: '#00ff41',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  desc: {
    marginTop: 50,
    color: '#444',
    textAlign: 'center',
    fontSize: 12,
  },
  code: {
    color: '#aaa',
    fontFamily: 'monospace',
    backgroundColor: '#222',
  },
});