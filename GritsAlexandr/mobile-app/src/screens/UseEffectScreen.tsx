import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffectStyles } from '../styles/useEffectStyles';

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
  }, [refetchToken]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(elapsed / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [elapsed]);

  return (
    <View style={useEffectStyles.card}>
      <Text style={useEffectStyles.title}>useEffect</Text>

      <View style={useEffectStyles.timerBox}>
        <Text style={useEffectStyles.timerLabel}>Таймер</Text>
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

      <View style={useEffectStyles.quoteCard}>
        <Text style={useEffectStyles.quoteTitle}>Цитата для вдохновения</Text>
        {isQuoteLoading ? (
          <ActivityIndicator color="#2563eb" />
        ) : (
          <>
            <Text style={useEffectStyles.quoteText}>
              {quote?.text ?? 'Здесь появится цитата после загрузки.'}
            </Text>
            {quote?.author ? (
              <Text style={useEffectStyles.quoteAuthor}>— {quote.author}</Text>
            ) : null}
          </>
        )}

        <TouchableOpacity
          style={useEffectStyles.refreshButton}
          onPress={() => setRefetchToken((prev) => prev + 1)}
          disabled={isQuoteLoading}
        >
          <Text style={useEffectStyles.refreshText}>
            {isQuoteLoading ? 'Обновляем...' : 'Новая цитата'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UseEffectScreen;