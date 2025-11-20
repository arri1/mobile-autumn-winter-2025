import { useState, useEffect } from 'react';
import Weather from '../components/Weather';

const UseEffectScreen = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [cities] = useState([
    { name: "Москва", lat: 55.7558, lon: 37.6173 },
    { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351 },
    { name: "Сочи", lat: 43.5855, lon: 39.7231 },
    { name: "Владивосток", lat: 43.1155, lon: 131.8855 }
  ]);
  const [currentCityIndex, setCurrentCityIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);
    
  const switchCity = () => {
    setCurrentCityIndex((prev) => (prev + 1) % cities.length);
  };

  const currentCity = cities[currentCityIndex];

  return (
    <div style={{ 
      background: '#fff',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Демонстрация useEffect
      </h2>

      {}
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '15px',
        border: '2px solid #dee2e6'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#495057' }}>
          Компонент погоды с useEffect
        </h3>
        
        <Weather 
          latitude={currentCity.lat}
          longitude={currentCity.lon}
          switchCity={switchCity}
        />
        
        <div style={{ 
          marginTop: '10px', 
          fontSize: '14px', 
          color: '#6c757d',
          textAlign: 'center'
        }}>
          Текущий город: <strong>{currentCity.name}</strong>
        </div>
      </div>

      {}
      <div style={{ 
        marginBottom: '30px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '10px',
        border: '2px solid #e9ecef'
      }}>
        <h3>Таймер: {timer} сек.</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '10px 20px',
              background: isRunning ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isRunning ? 'Пауза' : 'Старт'}
          </button>
          <button
            onClick={() => setTimer(0)}
            style={{
              padding: '10px 20px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseEffectScreen;