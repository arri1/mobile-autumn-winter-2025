import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UseEffectScreen() {
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const [cityCoordinate, setCityCoordinate] = useState('?latitude=62.0281&longitude=129.7326&current_weather=true');

  const [open, setOpen] = useState(false);
  const CITIES = [
    { coordinate: '?latitude=62.0281&longitude=129.7326&current_weather=true', label: 'Якутск' },
    { coordinate: '?latitude=55.7522&longitude=37.6156&current_weather=true', label: 'Москва' },
    { coordinate: '?latitude=35.6895&longitude=139.6917&current_weather=true', label: 'Токио' },
    { coordinate: '?latitude=48.8534&longitude=2.3488&current_weather=true', label: 'Париж' },
  ];

  const [items, setItems] = useState(
    CITIES.map((f) => ({ label: f.label, value: f.coordinate }))
  );

  useEffect(() => {
    let isActive = true;
    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        const url =
          'https://api.open-meteo.com/v1/forecast' + cityCoordinate;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather request failed');
        const json = await res.json();
        if (!isActive) return;
        setWeather(json.current_weather || null);
      } catch (e) {
        if (!isActive) return;
        setWeatherError('Не удалось загрузить погоду');
      } finally {
        if (isActive) setWeatherLoading(false);
      }
    }
    loadWeather();
    return () => {
      isActive = false;
    };
  }, [cityCoordinate]);

  return (
    <View>
      <View style={styles.PickerWrap}>
          <Text style={styles.PickerLabel}>Город:</Text>
          <DropDownPicker
            open={open}
            value={cityCoordinate}
            items={items}
            setOpen={setOpen}
            setValue={setCityCoordinate}
            setItems={setItems}
            containerStyle={{ flex: 1 }}
            zIndex={1000}
          />
      </View>

      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>
          Погода
        </Text>
        {weatherLoading ? (
          <Text>Загрузка...</Text>
        ) : weatherError ? (
          <Text>{weatherError}</Text>
        ) : weather ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e5e5e5',
              borderRadius: 10,
              backgroundColor: '#fafafa',
              padding: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Температура: {weather.temperature}°C
            </Text>
            <Text style={{ fontSize: 16 }}>
              Ветер: {weather.windspeed} км/ч
            </Text>
            <Text style={{ fontSize: 12, color: '#777', marginTop: 4 }}>
              Обновлено: {weather.time}
            </Text>
          </View>
        ) : (
          <Text>Нет данных о погоде</Text>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    PickerWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ddd',
    },
    PickerLabel: {
      color: '#555',
      fontSize: 14,
    },
});




