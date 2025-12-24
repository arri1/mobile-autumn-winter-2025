import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

// 1. Ссылка, которая будет хранить управление алертом
let alertRef: any = null;

// 2. Структура кнопки
interface AlertButton {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

// 3. Объект, который мы будем вызывать в коде (аналог Alert.alert)
export const MyAlert = {
  show: (title: string, message?: string, buttons: AlertButton[] = []) => {
    if (alertRef) {
      alertRef.open(title, message, buttons);
    }
  },
  close: () => {
    if (alertRef) {
      alertRef.close();
    }
  }
};

// 4. Сам Компонент (вставляем его ОДИН раз в _layout)
export const GlobalAlertComponent = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState<AlertButton[]>([]);

  // Цвета темы
  const overlayColor = 'rgba(0,0,0,0.5)';
  const dangerColor = '#FF3B30';
  const primaryColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');

  // Привязываем методы к глобальной переменной
  useEffect(() => {
    alertRef = {
      open: (t: string, m: string, b: AlertButton[]) => {
        setTitle(t);
        setMessage(m || '');
        // Если кнопок нет — добавляем ОК
        setButtons(b.length > 0 ? b : [{ text: 'OK', style: 'default' }]);
        setVisible(true);
      },
      close: () => {
        setVisible(false);
      }
    };
    // Очистка при размонтировании
    return () => { alertRef = null; };
  }, []);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        <ThemedView style={styles.alertBox}>
          
          <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
          {!!message && <ThemedText style={styles.message}>{message}</ThemedText>}

          <View style={styles.buttonContainer}>
            {buttons.map((btn, index) => {
              // Выбор цвета кнопки
              let color = primaryColor;
              if (btn.style === 'destructive') color = dangerColor;
              if (btn.style === 'cancel') color = textColor;

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, index > 0 && styles.buttonBorder]} // Разделитель
                  onPress={() => {
                    setVisible(false); // Сначала закрываем
                    if (btn.onPress) btn.onPress(); // Потом действие
                  }}
                >
                  <ThemedText style={[styles.buttonText, { color }]}>
                    {btn.text}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 270,
    borderRadius: 14,
    paddingTop: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  message: {
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128,128,128, 0.2)',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBorder: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(128,128,128, 0.2)',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  }
});