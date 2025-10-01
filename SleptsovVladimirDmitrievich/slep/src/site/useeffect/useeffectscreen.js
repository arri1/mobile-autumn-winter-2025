import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function UseEffectScreen() {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#00ff00ff',
      modalBackground: '#FFFFFF',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
      button: '#00ff00ff',
      modalBackground: '#1E1E1E',
    }
  };

  const currentTheme = theme.dark;

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    setModalVisible(false);
  };

  const openResetModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: currentTheme.text,
      textAlign: 'center',
    },
    themeSwitchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: currentTheme.card,
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    themeLabel: {
      fontSize: 18,
      color: currentTheme.text,
    },
    card: {
      backgroundColor: currentTheme.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
      alignItems: 'center',
    },
    timeText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: currentTheme.text,
      marginVertical: 30,
      fontVariant: ['tabular-nums'],
    },
    button: {
      backgroundColor: '#00ff00ff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
      minWidth: 200,
    },
    buttonStop: {
      backgroundColor: '#ff0000ff',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
      minWidth: 200,
    },
    buttonText: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
    },
    halfButton: {
      flex: 1,
      marginHorizontal: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000b3',
    },
    modalContent: {
      backgroundColor: currentTheme.modalBackground,
      borderRadius: 12,
      padding: 20,
      margin: 20,
      width: '80%',
      borderWidth: 1,
      borderColor: currentTheme.border,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      color: currentTheme.text,
      textAlign: 'center',
    },
    modalText: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      gap: 10,
    },
    modalButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 6,
      alignItems: 'center',
      flex: 1,
      minHeight: 40,  
    },
    modalButtonClose: {
      backgroundColor: '#ffff00ff',
    },
    modalButtonReset: {
      backgroundColor: '#ff0000ff',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
   
      <Text style={styles.header}>Секундомер</Text>

      <View style={styles.card}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>      
        <View style={styles.buttonRow}>
          {!isRunning ? (
            <TouchableOpacity 
              style={[styles.button, styles.halfButton]} 
              onPress={startStopwatch}
            >
              <Text style={styles.buttonText}>Старт</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.button, styles.halfButton]} 
              onPress={pauseStopwatch}
            >
              <Text style={styles.buttonText}>Пауза</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.buttonStop, styles.halfButton]} 
            onPress={openResetModal}
          >
            <Text style={styles.buttonText}>Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Сброс секундомера</Text>
            
            <Text style={styles.modalText}>
              Вы уверены, что хотите сбросить секундомер?
            </Text>
            <Text style={styles.modalText}>
              Текущее время: {formatTime(time)}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonReset]}
                onPress={resetStopwatch}
              >
                <Text style={styles.buttonText}>Сбросить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}