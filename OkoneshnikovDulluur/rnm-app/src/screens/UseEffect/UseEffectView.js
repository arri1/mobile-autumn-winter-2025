import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native-paper';
import { styles } from './UseEffectStyles';

export default function UseEffectView({
  navigation,
  cityName,
  weather,
  meta,
  isLoading,
  error,
  onReload,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Пример useEffect" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Title title={`Погода: ${cityName}`} />
          <Card.Content>
            {isLoading && <ActivityIndicator style={styles.loader} />}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {!isLoading && !error && weather && (
              <View style={styles.block}>
                <Text style={styles.rowText}>
                  Температура: {weather.temperature} °C
                </Text>
                <Text style={styles.rowText}>
                  Скорость ветра: {weather.windspeed} м/с
                </Text>
                <Text style={styles.rowText}>
                  Направление ветра: {weather.winddirection}°
                </Text>
                <Text style={styles.rowText}>
                  Время измерения: {weather.time}
                </Text>

                {meta ? (
                  <Text style={styles.metaText}>
                    Таймзона: {meta.timezone} • Высота: {meta.elevation} м
                  </Text>
                ) : null}
              </View>
            )}

            <Button
              mode="contained"
              style={styles.reloadButton}
              onPress={onReload}
            >
              Обновить
            </Button>
          </Card.Content>
        </Card>

        <Text style={styles.note}>
          Здесь useEffect запускает загрузку погоды при первом показе экрана.
        </Text>
      </ScrollView>
    </>
  );
}
