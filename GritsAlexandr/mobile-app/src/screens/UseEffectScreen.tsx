import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffectStyles } from '../styles/useEffectStyles';
import { useAppStore } from '../store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from '../styles/appStyles';

type Quote = {
  text: string;
  author?: string;
};

const UseEffectScreen = () => {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [refetchToken, setRefetchToken] = useState(0);

  // Используем Zustand store
  const { theme, counters, incrementCounter } = useAppStore();
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    let isActive = true;
    const fetchQuote = async () => {
      setIsQuoteLoading(true);
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        if (isActive) {
          setQuote({
            text: data.content,
            author: data.author || 'Неизвестный автор',
          });
          incrementCounter('useEffect');
        }
      } catch (error) {
        if (isActive) {
          const fallbackQuotes = [
            { text: 'Иногда достаточно просто сделать вдох и продолжать.', author: 'Неизвестный автор' },
            { text: 'Маленькие шаги каждый день приводят к большим результатам.', author: 'Неизвестный автор' },
            { text: 'Успех — это движение от неудачи к неудаче без потери энтузиазма.', author: 'Уинстон Черчилль' },
          ];
          const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
          setQuote(randomFallback);
          incrementCounter('useEffect');
        }
      } finally {
        if (isActive) {
          setIsQuoteLoading(false);
        }
      }
    };

    fetchQuote();

    return () => {
      isActive = false;
    };
  }, [refetchToken, incrementCounter]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [elapsed]);

  return (
    <View style={[useEffectStyles.card, { backgroundColor: themeStyles.background }]}>
      <Text style={[useEffectStyles.title, { color: themeStyles.text }]}>
        useEffect + Zustand
      </Text>
      
      {/* Статистика использования */}
      <View style={{ 
        backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9', 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 16 
      }}>
        <Text style={{ 
          color: theme === 'dark' ? '#e5e7eb' : '#475569', 
          fontSize: 14, 
          fontWeight: '600' 
        }}>
          📊 Использований useEffect: {counters.useEffect}
        </Text>
      </View>

      <View style={useEffectStyles.timerBox}>
        <Text style={useEffectStyles.timerLabel}>Сессия фокуса</Text>
        <Text style={useEffectStyles.timerValue}>{formattedTime}</Text>
        <View style={useEffectStyles.timerActions}>
          <TouchableOpacity
            style={[
              useEffectStyles.actionButton,
              isRunning ? useEffectStyles.pauseButton : useEffectStyles.startButton,
            ]}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            <Text style={useEffectStyles.actionText}>
              {isRunning ? 'Пауза' : 'Старт'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[useEffectStyles.actionButton, useEffectStyles.resetButton]}
            onPress={() => {
              setElapsed(0);
              setIsRunning(false);
            }}
          >
            <Text style={useEffectStyles.actionText}>Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[useEffectStyles.quoteCard, { backgroundColor: themeStyles.card }]}>
        <Text style={[useEffectStyles.quoteTitle, { color: themeStyles.text }]}>
          Цитата для вдохновения
        </Text>
        {isQuoteLoading ? (
          <ActivityIndicator color={themeStyles.primary} />
        ) : (
          <>
            <Text style={[useEffectStyles.quoteText, { color: themeStyles.text }]}>
              {quote?.text ?? 'Здесь появится цитата после загрузки.'}
            </Text>
            {quote?.author ? (
              <Text style={[useEffectStyles.quoteAuthor, { color: themeStyles.secondary }]}>
                — {quote.author}
              </Text>
            ) : null}
          </>
        )}

        <TouchableOpacity
          style={[useEffectStyles.refreshButton, { borderColor: themeStyles.primary }]}
          onPress={() => setRefetchToken((prev) => prev + 1)}
          disabled={isQuoteLoading}
        >
          <Text style={[useEffectStyles.refreshText, { color: themeStyles.primary }]}>
            {isQuoteLoading ? 'Обновляем...' : 'Новая цитата'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UseEffectScreen;