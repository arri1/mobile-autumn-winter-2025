const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <label style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px',
    cursor: 'pointer',
    padding: '15px',
    borderRadius: '8px',
    background: isDark ? '#3d3d3d' : '#f0f0f0',
    transition: 'all 0.2s ease',
    border: `2px solid ${isDark ? '#555' : '#ddd'}`
  }}>
    <input
      type="checkbox"
      checked={isDark}
      onChange={onToggle}
      style={{ 
        width: '20px', 
        height: '20px',
        accentColor: isDark ? '#007bff' : '#007bff'
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
        {isDark ? 'Тёмная тема' : 'Светлая тема'}
      </div>
      <div style={{ fontSize: '12px', opacity: 0.7 }}>
        {isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      </div>
    </div>
  </label>
);
export default ThemeToggle;