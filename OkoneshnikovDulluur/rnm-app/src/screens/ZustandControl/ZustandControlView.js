import React from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text, Button, TextInput } from 'react-native-paper';
import { styles } from './ZustandControlStyles';

export default function ZustandControlView({
  count,
  onInc,
  onDec,
  onReset,
  text,
  onChangeText,
  onAdd,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Zustand: управление" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Общий счётчик (store)" />
          <Card.Content>
            <Text style={styles.big}>{count}</Text>

            <View style={styles.row}>
              <Button mode="contained" onPress={onInc} style={styles.btn}>
                +1
              </Button>
              <Button mode="contained" onPress={onDec} style={styles.btn}>
                -1
              </Button>
              <Button mode="outlined" onPress={onReset}>
                Сброс
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Сообщение в историю" />
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Текст"
              value={text}
              onChangeText={onChangeText}
            />
            <Button mode="contained" style={styles.addBtn} onPress={onAdd}>
              Добавить
            </Button>

            <Text style={styles.note}>
              Откройте вкладку «История» — там сразу появятся изменения.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
