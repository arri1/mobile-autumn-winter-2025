import { useState } from 'react';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';

type WindowType = 'state' | 'effect';

const App = () => {
  const [currentWindow, setCurrentWindow] = useState<WindowType>('state');

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{
        background: '#fff',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <button
          onClick={() => setCurrentWindow('state')}
          style={{
            padding: '12px 24px',
            background: currentWindow === 'state' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
        >
          useState
        </button>
        
        <button
          onClick={() => setCurrentWindow('effect')}
          style={{
            padding: '12px 24px',
            background: currentWindow === 'effect' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
        >
          useEffect
        </button>
      </nav>

      {/* Контент */}
      <div style={{ padding: '20px' }}>
        {currentWindow === 'state' && <UseStateScreen />}
        {currentWindow === 'effect' && <UseEffectScreen />}
      </div>
    </div>
  );
};

export default App;