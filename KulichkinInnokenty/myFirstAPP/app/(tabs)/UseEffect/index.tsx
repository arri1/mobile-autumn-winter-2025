import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Switch, ActivityIndicator, StyleSheet } from "react-native";
import { Container, Card, Button, Input, H2, H3, Body, Caption } from '../../../components/ui';

export default function UseEffectLab() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [enabled, setEnabled] = useState(false);

  // локальный стейт для отображения сообщений из useEffect
  const [effectMessage, setEffectMessage] = useState("");

  // API fetch demo
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Interval demo
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const fetchPost = useCallback(async (id = postId) => {
    try {
      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        signal: controller.signal,
      });
      const json = await res.json();
      setPost(json);
    } catch (e) {
      console.log('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  // useEffect примеры
  useEffect(() => {
    const msg = `Счётчик изменился: ${count}`;
    console.log(msg);
    setEffectMessage(msg);
  }, [count]);

  useEffect(() => {
    const msg = `Переключатель: ${enabled ? "Включено" : "Выключено"}`;
    console.log(msg);
    setEffectMessage(msg);
  }, [enabled]);

  useEffect(() => {
    const msg = `Текст изменился: ${text || "ничего"}`;
    console.log(msg);
    setEffectMessage(msg);
  }, [text]);

  // useEffect для загрузки постов
  useEffect(() => {
    fetchPost(postId);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [postId, fetchPost]);

  // useEffect для интервального таймера
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <Container scrollable padding="md">
      <H2 style={styles.pageTitle}>useEffect Hook</H2>
      <Caption color="secondary" style={styles.pageSubtitle}>
        Демонстрация побочных эффектов и жизненного цикла
      </Caption>

      {/* API Fetch Demo */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Загрузка данных (API)</H3>

        <View style={styles.infoRow}>
          <Caption color="secondary">ID поста</Caption>
          <Body weight="semibold">{postId}</Body>
        </View>

        <View style={styles.infoRow}>
          <Caption color="secondary">Статус</Caption>
          <Body weight="medium">{loading ? 'Загрузка...' : 'Загружено'}</Body>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000000" />
            <Caption color="secondary" style={styles.loadingText}>
              Загрузка данных...
            </Caption>
          </View>
        ) : (
          <View style={styles.postContainer}>
            <Caption color="secondary">Заголовок поста:</Caption>
            <Body style={styles.postContent}>{post?.title || '—'}</Body>
          </View>
        )}

        <View style={styles.buttonStack}>
          <Button
            title="Случайный ID"
            onPress={() => setPostId(1 + Math.floor(Math.random() * 100))}
            variant="primary"
            size="md"
          />
          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <Button
                title="Обновить"
                onPress={() => fetchPost()}
                variant="outline"
                size="sm"
              />
            </View>
            <View style={styles.buttonHalf}>
              <Button
                title="Отменить"
                onPress={() => abortRef.current?.abort()}
                variant="ghost"
                size="sm"
              />
            </View>
          </View>
        </View>
      </Card>

      {/* Interval Timer Demo */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Интервальный таймер</H3>

        <View style={styles.timerDisplay}>
          <H2 style={styles.timerText}>{seconds}s</H2>
          <Caption color="secondary">
            {running ? 'Запущен' : 'Остановлен'}
          </Caption>
        </View>

        <View style={styles.buttonStack}>
          <Button
            title={running ? 'Пауза' : 'Старт'}
            onPress={() => setRunning(v => !v)}
            variant="primary"
            size="md"
          />
          <Button
            title="Сброс"
            onPress={() => setSeconds(0)}
            variant="outline"
            size="md"
          />
        </View>
      </Card>

      {/* Последнее событие */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Последнее событие</H3>
        <View style={styles.eventContainer}>
          <Body weight="medium">{effectMessage || 'Нет событий'}</Body>
        </View>
      </Card>

      {/* Счётчик */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Счётчик</H3>

        <View style={styles.counterDisplay}>
          <Caption color="secondary">Текущее значение</Caption>
          <H2>{count}</H2>
        </View>

        <View style={styles.buttonStack}>
          <Button
            title="Увеличить"
            onPress={() => setCount(count + 1)}
            variant="primary"
            size="md"
          />
          <Button
            title="Сброс"
            onPress={() => setCount(0)}
            variant="outline"
            size="md"
          />
        </View>
      </Card>

      {/* Переключатель */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Переключатель</H3>

        <View style={styles.switchRow}>
          <View>
            <Body weight="semibold">{enabled ? "Включено" : "Выключено"}</Body>
            <Caption color="secondary">Состояние переключателя</Caption>
          </View>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: '#E5E5E5', true: '#525252' }}
            thumbColor={enabled ? '#000000' : '#A3A3A3'}
          />
        </View>
      </Card>

      {/* Текстовое поле */}
      <Card variant="outlined">
        <H3 style={styles.cardTitle}>Текстовое поле</H3>

        <Input
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
        />

        <View style={styles.textPreview}>
          <Caption color="secondary">Вы ввели:</Caption>
          <Body>{text || "ничего"}</Body>
        </View>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  pageSubtitle: {
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  loadingText: {
    marginBottom: 0,
  },
  postContainer: {
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  postContent: {
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
  },
  buttonStack: {
    gap: 12,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  timerDisplay: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 0,
  },
  eventContainer: {
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
  },
  counterDisplay: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPreview: {
    gap: 4,
    marginTop: 12,
  },
});
