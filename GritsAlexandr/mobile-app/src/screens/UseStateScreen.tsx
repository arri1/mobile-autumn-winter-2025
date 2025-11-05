import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Counter from "../components/Counter";

const UseStateScreen = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ 
      background: isDark ? '#1a1a1a' : '#f8f9fa',
      color: isDark ? '#fff' : '#333',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: isDark ? '#2d2d2d' : '#fff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: isDark ? '#fff' : '#333'
        }}>
          useState
        </h1>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '15px' }}>Настройка темы</h2>
          <ThemeToggle 
            isDark={isDark} 
            onToggle={() => setIsDark(!isDark)} 
          />
        </div>

        {}
        <div>
          <h2 style={{
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Cчётчик</h2>
          <Counter
            count={count}
            onIncrement={() => setCount(count + 1)}
            onDecrement={() => setCount(count - 1)}
            onReset={() => setCount(0)}
          />
        </div>
      </div>
    </div>
  );
};
export default UseStateScreen;