import React from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Card, Text, Button } from 'react-native-paper';
import { styles } from './ZustandHistoryStyles';

function HistoryItem({ text }) {
  return (
    <Card style={styles.itemCard}>
      <Card.Content>
        <Text>{text}</Text>
      </Card.Content>
    </Card>
  );
}

export default function ZustandHistoryView({
  count,
  history,
  onClearHistory,
  onReset,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Zustand: история" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Состояние store" />
          <Card.Content>
            <Text style={styles.big}>{count}</Text>

            <View style={styles.row}>
              <Button mode="outlined" onPress={onReset} style={styles.btn}>
                Сброс счётчика
              </Button>
              <Button mode="outlined" onPress={onClearHistory}>
                Очистить историю
              </Button>
            </View>
          </Card.Content>
        </Card>

        <FlatList
          data={history}
          keyExtractor={(x) => x.id}
          renderItem={({ item }) => <HistoryItem text={item.text} />}
          ListEmptyComponent={<Text style={styles.empty}>История пуста.</Text>}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
}
