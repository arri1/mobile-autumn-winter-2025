import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
        const response = await fetch('https://type.fit/api/quotes');
        const data = (await response.json()) as Quote[];
        if (isActive && data.length) {
          const randomQuote =
            data[Math.floor(Math.random() * Math.min(200, data.length))];
          setQuote(randomQuote);
        }
      } catch (error) {
        if (isActive) {
          setQuote({
            text: 'Иногда достаточно просто сделать вдох и продолжать.',
            author: 'Неизвестный автор',
          });
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
    <View style={styles.card}>
      <Text style={styles.title}>useEffect</Text>
      <Text style={styles.subtitle}>
        Следим за таймером и подгружаем вдохновляющие цитаты при изменении
        состояния.
      </Text>

      <View style={styles.timerBox}>
        <Text style={styles.timerLabel}>Сессия фокуса</Text>
        <Text style={styles.timerValue}>{formattedTime}</Text>
        <View style={styles.timerActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isRunning ? styles.pauseButton : styles.startButton,
            ]}
            onPress={() => setIsRunning((prev) => !prev)}
          >
            <Text style={styles.actionText}>
              {isRunning ? 'Пауза' : 'Старт'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={() => {
              setElapsed(0);
              setIsRunning(false);
            }}
          >
            <Text style={styles.actionText}>Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteTitle}>Цитата для вдохновения</Text>
        {isQuoteLoading ? (
          <ActivityIndicator color="#2563eb" />
        ) : (
          <>
            <Text style={styles.quoteText}>
              {quote?.text ?? 'Здесь появится цитата после загрузки.'}
            </Text>
            {quote?.author ? (
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
            ) : null}
          </>
        )}

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => setRefetchToken((prev) => prev + 1)}
          disabled={isQuoteLoading}
        >
          <Text style={styles.refreshText}>
            {isQuoteLoading ? 'Обновляем...' : 'Новая цитата'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  timerBox: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#0f172a',
    marginBottom: 20,
  },
  timerLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  timerValue: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    marginVertical: 8,
  },
  timerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#22c55e',
  },
  pauseButton: {
    backgroundColor: '#f97316',
  },
  resetButton: {
    backgroundColor: '#475569',
    marginRight: 0,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  quoteCard: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  refreshButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 10,
    alignItems: 'center',
  },
  refreshText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default UseEffectScreen;

