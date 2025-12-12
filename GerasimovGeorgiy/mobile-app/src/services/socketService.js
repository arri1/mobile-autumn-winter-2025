import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration (должен совпадать с api.js)
const API_BASE_URL = 'http://localhost:3000';

// Состояние сервиса
let socket = null;
let isConnected = false;
const listeners = new Map();

/**
 * Подключиться к Socket.IO серверу
 */
const connect = async () => {
  if (socket?.connected) {
    return socket;
  }

  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token available');
    }

    socket = io(API_BASE_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      isConnected = true;
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
      isConnected = false;
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      isConnected = false;
    });

    return socket;
  } catch (error) {
    console.error('Error connecting to Socket.IO:', error);
    throw error;
  }
};

/**
 * Отключиться от сервера
 */
const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    isConnected = false;
  }
};

/**
 * Инициировать звонок
 */
const initiateCall = (targetUserId, offer) => {
  if (!socket?.connected) {
    throw new Error('Socket not connected');
  }
  socket.emit('call:initiate', { targetUserId, offer });
};

/**
 * Ответить на звонок
 */
const answerCall = (targetUserId, answer) => {
  if (!socket?.connected) {
    throw new Error('Socket not connected');
  }
  socket.emit('call:answer', { targetUserId, answer });
};

/**
 * Отклонить звонок
 */
const rejectCall = (targetUserId) => {
  if (!socket?.connected) {
    throw new Error('Socket not connected');
  }
  socket.emit('call:reject', { targetUserId });
};

/**
 * Завершить звонок
 */
const endCall = (targetUserId) => {
  if (!socket?.connected) {
    throw new Error('Socket not connected');
  }
  socket.emit('call:end', { targetUserId });
};

/**
 * Отправить ICE candidate
 */
const sendIceCandidate = (targetUserId, candidate) => {
  if (!socket?.connected) {
    return;
  }
  socket.emit('ice:candidate', { targetUserId, candidate });
};

/**
 * Подписаться на событие
 */
const on = (event, callback) => {
  if (!socket) {
    throw new Error('Socket not initialized. Call connect() first.');
  }
  
  const wrappedCallback = (...args) => {
    callback(...args);
  };
  
  socket.on(event, wrappedCallback);
  
  // Сохраняем для возможности отписки
  if (!listeners.has(event)) {
    listeners.set(event, []);
  }
  listeners.get(event).push(wrappedCallback);
};

/**
 * Отписаться от события
 */
const off = (event, callback) => {
  if (!socket) {
    return;
  }
  
  if (callback) {
    socket.off(event, callback);
  } else {
    // Отписаться от всех обработчиков события
    const callbacks = listeners.get(event) || [];
    callbacks.forEach(cb => socket.off(event, cb));
    listeners.delete(event);
  }
};

export default {
  connect,
  disconnect,
  initiateCall,
  answerCall,
  rejectCall,
  endCall,
  sendIceCandidate,
  on,
  off,
};
