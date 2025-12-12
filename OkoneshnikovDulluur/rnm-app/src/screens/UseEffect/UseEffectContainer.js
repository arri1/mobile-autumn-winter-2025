import React, { useEffect, useState } from 'react';
import UseEffectView from './UseEffectView';

const YAKUTSK = { name: 'Якутск', lat: 62.0272, lon: 129.7319 };

async function fetchWeather({ lat, lon }) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lon}` +
    `&current_weather=true` +
    `&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Не удалось загрузить погоду');
  }
  return res.json();
}

export default function UseEffectContainer({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = async () => {
    try {
      setIsLoading(true);
      setError('');

      const data = await fetchWeather(YAKUTSK);

      setWeather(data.current_weather || null);
      setMeta({
        timezone: data.timezone,
        elevation: data.elevation,
      });
    } catch (e) {
      setError(e.message || 'Ошибка загрузки');
      setWeather(null);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <UseEffectView
      navigation={navigation}
      cityName={YAKUTSK.name}
      weather={weather}
      meta={meta}
      isLoading={isLoading}
      error={error}
      onReload={loadWeather}
    />
  );
}
