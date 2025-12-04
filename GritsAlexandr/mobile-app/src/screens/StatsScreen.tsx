import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from '../styles/appStyles';
import { statsScreenStyles } from '../styles/statsScreenStyles';

const StatsScreen = () => {
  const { 
    theme, 
    userName, 
    counters, 
    toggleTheme, 
    resetCounters
  } = useAppStore();

  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const totalUsage = counters.useState + counters.useEffect + counters.useMemo;
  const mostUsedHook = Object.entries(counters).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );

  return (
    <ScrollView style={[statsScreenStyles.container, { 
      backgroundColor: themeStyles.background 
    }]}>
      <Text style={[statsScreenStyles.title, { 
        color: themeStyles.text 
      }]}>
        📊 Статистика приложения
      </Text>

      {/* Карточка пользователя */}
      <View style={[statsScreenStyles.card, { 
        backgroundColor: themeStyles.card 
      }]}>
        <Text style={[statsScreenStyles.cardTitle, { 
          color: themeStyles.text 
        }]}>
          👤 Пользователь
        </Text>
        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { color: themeStyles.secondary }]}>
            Имя:
          </Text>
          <Text style={[statsScreenStyles.value, { color: themeStyles.primary }]}>
            {userName}
          </Text>
        </View>
        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { color: themeStyles.secondary }]}>
            Тема:
          </Text>
          <Text style={[statsScreenStyles.value, { color: themeStyles.primary }]}>
            {theme === 'light' ? 'Светлая' : 'Тёмная'}
          </Text>
        </View>
      </View>

      {/* Карточка статистики хуков */}
      <View style={[statsScreenStyles.card, { 
        backgroundColor: themeStyles.card 
      }]}>
        <Text style={[statsScreenStyles.cardTitle, { 
          color: themeStyles.text 
        }]}>
          🎯 Использование хуков
        </Text>
        
        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { color: themeStyles.secondary }]}>
            useState:
          </Text>
          <Text style={[statsScreenStyles.value, { color: '#ef4444' }]}>
            {counters.useState} раз
          </Text>
        </View>
        
        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { color: themeStyles.secondary }]}>
            useEffect:
          </Text>
          <Text style={[statsScreenStyles.value, { color: '#22c55e' }]}>
            {counters.useEffect} раз
          </Text>
        </View>
        
        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { color: themeStyles.secondary }]}>
            useMemo:
          </Text>
          <Text style={[statsScreenStyles.value, { color: '#8b5cf6' }]}>
            {counters.useMemo} раз
          </Text>
        </View>

        <View style={[statsScreenStyles.divider, { backgroundColor: themeStyles.border }]} />

        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { 
            fontSize: 16, 
            color: themeStyles.text 
          }]}>
            Всего использований:
          </Text>
          <Text style={[statsScreenStyles.value, { 
            fontSize: 18, 
            color: themeStyles.primary 
          }]}>
            {totalUsage}
          </Text>
        </View>

        <View style={statsScreenStyles.statRow}>
          <Text style={[statsScreenStyles.label, { 
            fontSize: 16, 
            color: themeStyles.text 
          }]}>
            Самый популярный хук:
          </Text>
          <Text style={[statsScreenStyles.value, { 
            fontSize: 16, 
            color: '#ef4444' 
          }]}>
            {mostUsedHook[0]} ({mostUsedHook[1]})
          </Text>
        </View>
      </View>

      {/* Действия */}
      <View style={statsScreenStyles.actions}>
        <TouchableOpacity 
          style={[statsScreenStyles.button, { backgroundColor: themeStyles.primary }]} 
          onPress={toggleTheme}
        >
          <Text style={statsScreenStyles.buttonText}>
            {theme === 'light' ? '🌙 Переключить на тёмную' : '☀️ Переключить на светлую'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[statsScreenStyles.button, { backgroundColor: '#dc2626' }]} 
          onPress={resetCounters}
        >
          <Text style={statsScreenStyles.buttonText}>🔄 Сбросить счетчики</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StatsScreen;