const Counter = ({ count, onIncrement, onDecrement, onReset }: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}) => (
  <div>
    <div style={{ 
      textAlign: 'center', 
      fontSize: '24px', 
      fontWeight: 'bold',
      marginBottom: '20px',
      color: count > 0 ? '#28a745' : count < 0 ? '#dc3545' : '#6c757d'
    }}>
      {count}
    </div>

    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
        onClick={onDecrement}
        style={{
          padding: '12px 20px',
          background: '#ff0000ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          flex: 1,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#b95656ff'}
        onMouseOut={(e) => e.currentTarget.style.background = '#e61e1eff'}
      >
        -
      </button>
      
      <button
        onClick={onIncrement}
        style={{
          padding: '12px 20px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          flex: 1,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#218838'}
        onMouseOut={(e) => e.currentTarget.style.background = '#28a745'}
      >
        +
      </button>

      
    </div>

    <button
      onClick={onReset}
      disabled={count === 0}
      style={{
        padding: '12px 20px',
        background: count === 0 ? '#6c757d' : '#000000ff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: count === 0 ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        width: '100%',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        if (count !== 0) e.currentTarget.style.background = '#b1b1b1ff';
      }}
      onMouseOut={(e) => {
        if (count !== 0) e.currentTarget.style.background = '#000000ff';
      }}
    >
        Сброс
    </button>
  </div>
);
export default Counter;