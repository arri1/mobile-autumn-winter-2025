import React from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text, TextInput, Button } from 'react-native-paper';
import { styles } from './UseMemoStyles';

export default function UseMemoView({ navigation, text, onChangeText, stats }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Пример useMemo" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Введите текст" />
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Текст"
              value={text}
              onChangeText={onChangeText}
              multiline
              numberOfLines={4}
            />

            <View style={styles.statsBlock}>
              <Text style={styles.line}>Символов: {stats.chars}</Text>
              <Text style={styles.line}>Без пробелов: {stats.charsNoSpaces}</Text>
              <Text style={styles.line}>Слов: {stats.wordCount}</Text>
              <Text style={styles.line}>Уникальных слов: {stats.uniqueCount}</Text>
            </View>

            <Card style={styles.previewCard}>
              <Card.Content>
                <Text style={styles.previewTitle}>Превью:</Text>
                <Text style={styles.previewText}>
                  {stats.previewText || '—'}
                </Text>
              </Card.Content>
            </Card>

            <Button
              mode="outlined"
              style={styles.clearButton}
              onPress={() => onChangeText('')}
            >
              Очистить
            </Button>

            <Text style={styles.note}>
              useMemo пересчитывает статистику только при изменении текста.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
