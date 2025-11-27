import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Button, Switch, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { styles } from './styles';

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
      // ignore abort errors
      console.log('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  //useEffect
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* API Fetch Demo */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Загрузка данных (API)</Text>
        <Text style={styles.infoText}>ID поста: {postId}</Text>
        <Text style={styles.statusText}>
          Статус: {loading ? '⏳ Загрузка...' : '✅ Загружено'}
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 10 }} />
        ) : (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>Заголовок:</Text>
            <Text style={styles.postContent}>{post?.title || '—'}</Text>
          </View>
        )}
        <View style={styles.buttonGroup}>
          <Button
            title="Random ID"
            onPress={() => setPostId(1 + Math.floor(Math.random() * 100))}
          />
          <Button title="Обновить" onPress={() => fetchPost()} />
          <Button
            title="Отменить"
            onPress={() => abortRef.current?.abort()}
            color="#FF3B30"
          />
        </View>
      </View>

      {/* Interval Timer Demo */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Интервальный таймер</Text>
        <Text style={styles.timerText}>{seconds}s</Text>
        <Text style={styles.statusText}>
          {running ? '▶️ Запущен' : '⏸️ Пауза'}
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title={running ? 'Пауза' : 'Старт'}
            onPress={() => setRunning(v => !v)}
          />
          <Button title="Сброс" onPress={() => setSeconds(0)} color="#FF9500" />
        </View>
      </View>

      {/* Отображаем сообщение из useEffect */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Последнее событие (useEffect)</Text>
        <Text style={{ fontSize: 16, color: "#007AFF" }}>{effectMessage}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Счётчик</Text>
        <Text style={styles.counterText}>Счёт: {count}</Text>
        <View style={styles.buttonGroup}>
          <Button title="Добавить" onPress={() => setCount(count + 1)} />
          <Button title="Сброс" onPress={() => setCount(0)} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Переключатель</Text>
        <Text style={styles.switchLabel}>{enabled ? "Включено" : "Выключено"}</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Текстовое поле</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите текст..."
          value={text}
          onChangeText={setText}
        />
        <Text style={styles.previewText}>Вы ввели: {text || "ничего"}</Text>
      </View>
    </ScrollView>
  );
}
