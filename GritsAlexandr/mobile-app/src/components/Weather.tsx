import { useState, useEffect } from "react";

const Weather = ({ latitude, longitude, switchCity }: {
  latitude: number;
  longitude: number;
  switchCity: () => void;
}) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`
        );
        const data = await response.json();
        setWeather(data.current);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h3>Погода</h3>
      {weather && (
        <>
          <p>Температура: {weather.temperature_2m}°C</p>
        </>
      )}
      <button onClick={switchCity}>Сменить город</button>
    </div>
  );
};

export default Weather;