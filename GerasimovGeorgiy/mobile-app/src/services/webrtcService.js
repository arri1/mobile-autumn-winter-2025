import apiService from './api';
import socketService from './socketService';

/**
 * WebRTC Service
 * Управление WebRTC соединениями для видеозвонков
 * 
 * Поддерживает:
 * - Web (через браузерные WebRTC API)
 * - React Native (через react-native-webrtc в development build)
 */

// Состояние сервиса
let iceServers = null;
let localStream = null;
let remoteStream = null;
let peerConnection = null;
let isCaller = false;
let targetUserId = null;
let onRemoteStreamCallback = null;
let onConnectionStateChangeCallback = null;
let RTCPeerConnectionClass = null;

/**
 * Получить RTCPeerConnection класс
 * В браузере использует встроенный WebRTC API
 * В React Native должен быть передан из react-native-webrtc
 */
const getRTCPeerConnection = () => {
  // В браузере используем встроенный API
  if (typeof RTCPeerConnection !== 'undefined') {
    return RTCPeerConnection;
  }
  
  // В React Native должен быть установлен react-native-webrtc
  // и передан через setRTCPeerConnection
  if (RTCPeerConnectionClass) {
    return RTCPeerConnectionClass;
  }
  
  throw new Error('RTCPeerConnection not available. Install react-native-webrtc or use in browser.');
};

/**
 * Установить RTCPeerConnection класс (для React Native)
 */
const setRTCPeerConnection = (RTCPeerConnection) => {
  RTCPeerConnectionClass = RTCPeerConnection;
};

/**
 * Получить конфигурацию ICE серверов с бэкенда
 */
const getIceServersConfig = async () => {
  try {
    if (iceServers) {
      return iceServers;
    }

    const response = await apiService.getIceServers();
    if (response.success && response.data.iceServers) {
      iceServers = response.data.iceServers;
      return iceServers;
    }
    throw new Error('Failed to get ICE servers');
  } catch (error) {
    console.error('Error getting ICE servers:', error);
    // Fallback на публичные STUN серверы
    return [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ];
  }
};

/**
 * Получить RTCPeerConnection конфигурацию
 */
const getPeerConnectionConfig = async () => {
  const servers = await getIceServersConfig();
  return {
    iceServers: servers,
    iceCandidatePoolSize: 10,
  };
};

/**
 * Получить медиа-поток (видео и аудио)
 */
const getLocalStream = async (video = true, audio = true) => {
  try {
    // В браузере используем getUserMedia
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        } : false,
        audio: audio ? {
          echoCancellation: true,
          noiseSuppression: true,
        } : false,
      });
      
      localStream = stream;
      return stream;
    }
    
    // В React Native нужно использовать react-native-webrtc
    throw new Error('getUserMedia not available. Use react-native-webrtc mediaDevices.');
  } catch (error) {
    console.error('Error getting local stream:', error);
    throw error;
  }
};

/**
 * Создать peer connection
 */
const createPeerConnection = async () => {
  if (peerConnection) {
    return peerConnection;
  }

  const RTCPeerConnection = getRTCPeerConnection();
  const config = await getPeerConnectionConfig();
  
  peerConnection = new RTCPeerConnection(config);

  // Добавляем локальный поток в peer connection
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
  }

  // Обработчики событий
  peerConnection.onicecandidate = (event) => {
    if (event.candidate && targetUserId) {
      console.log('ICE candidate:', event.candidate);
      socketService.sendIceCandidate(targetUserId, event.candidate);
    }
  };

  peerConnection.oniceconnectionstatechange = () => {
    const state = peerConnection.iceConnectionState;
    console.log('ICE connection state:', state);
    
    if (onConnectionStateChangeCallback) {
      onConnectionStateChangeCallback(state);
    }
  };

  peerConnection.ontrack = (event) => {
    console.log('Received remote track:', event.track);
    if (event.streams && event.streams[0]) {
      remoteStream = event.streams[0];
      if (onRemoteStreamCallback) {
        onRemoteStreamCallback(event.streams[0]);
      }
    }
  };

  return peerConnection;
};

/**
 * Настроить обработчики Socket.IO событий
 */
const setupSocketHandlers = () => {
  // Обработка входящего answer (для инициатора)
  socketService.on('call:answered', async ({ fromUserId, answer }) => {
    if (fromUserId === targetUserId && isCaller) {
      try {
        if (typeof RTCSessionDescription !== 'undefined') {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
          await peerConnection.setRemoteDescription(answer);
        }
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    }
  });

  // Обработка ICE candidates
  socketService.on('ice:candidate', async ({ fromUserId, candidate }) => {
    if (fromUserId === targetUserId && candidate) {
      try {
        if (typeof RTCIceCandidate !== 'undefined') {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          await peerConnection.addIceCandidate(candidate);
        }
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    }
  });

  // Обработка отклонения звонка
  socketService.on('call:rejected', ({ fromUserId }) => {
    if (fromUserId === targetUserId) {
      cleanup();
    }
  });

  // Обработка завершения звонка
  socketService.on('call:ended', ({ fromUserId }) => {
    if (fromUserId === targetUserId) {
      cleanup();
    }
  });
};

/**
 * Инициировать звонок (создать offer)
 */
const initiateCall = async (userId) => {
  try {
    targetUserId = userId;
    isCaller = true;

    // Подключаемся к Socket.IO
    await socketService.connect();

    // Получаем локальный поток
    await getLocalStream(true, true);

    // Создаем peer connection
    await createPeerConnection();

    // Создаем offer
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });

    await peerConnection.setLocalDescription(offer);

    // Отправляем offer через Socket.IO
    socketService.initiateCall(targetUserId, offer);

    // Настраиваем обработчики Socket.IO событий
    setupSocketHandlers();

    return offer;
  } catch (error) {
    console.error('Error initiating call:', error);
    throw error;
  }
};

/**
 * Ответить на входящий звонок
 */
const answerCall = async (userId, offer) => {
  try {
    targetUserId = userId;
    isCaller = false;

    // Подключаемся к Socket.IO
    await socketService.connect();

    // Получаем локальный поток
    await getLocalStream(true, true);

    // Создаем peer connection
    await createPeerConnection();

    // Устанавливаем удаленный offer
    if (typeof RTCSessionDescription !== 'undefined') {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    } else {
      await peerConnection.setRemoteDescription(offer);
    }

    // Создаем answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Отправляем answer через Socket.IO
    socketService.answerCall(targetUserId, answer);

    // Настраиваем обработчики Socket.IO событий
    setupSocketHandlers();

    return answer;
  } catch (error) {
    console.error('Error answering call:', error);
    throw error;
  }
};

/**
 * Завершить звонок
 */
const endCall = () => {
  if (targetUserId) {
    socketService.endCall(targetUserId);
  }
  cleanup();
};

/**
 * Отклонить звонок
 */
const rejectCall = (userId) => {
  socketService.rejectCall(userId);
  cleanup();
};

/**
 * Установить callback для удаленного потока
 */
const onRemoteStream = (callback) => {
  onRemoteStreamCallback = callback;
};

/**
 * Установить callback для изменения состояния соединения
 */
const onConnectionStateChange = (callback) => {
  onConnectionStateChangeCallback = callback;
};

/**
 * Переключить видео (включить/выключить)
 */
const toggleVideo = () => {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
  }
  return false;
};

/**
 * Переключить аудио (включить/выключить)
 */
const toggleAudio = () => {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
  }
  return false;
};

/**
 * Очистить соединение
 */
const cleanup = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteStream = null;
  }
  
  // Удаляем обработчики Socket.IO
  socketService.off('call:answered');
  socketService.off('ice:candidate');
  socketService.off('call:rejected');
  socketService.off('call:ended');
  
  targetUserId = null;
  isCaller = false;
};

/**
 * Получить информацию о конфигурации (для отладки)
 */
const getConfigInfo = async () => {
  const servers = await getIceServersConfig();
  return {
    iceServers: servers,
    stunCount: servers.filter((s) => {
      const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
      return urls.some(url => url.includes('stun:'));
    }).length,
    turnCount: servers.filter((s) => {
      const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
      return urls.some(url => url.includes('turn:'));
    }).length,
  };
};

export default {
  setRTCPeerConnection,
  getLocalStream,
  initiateCall,
  answerCall,
  endCall,
  rejectCall,
  onRemoteStream,
  onConnectionStateChange,
  toggleVideo,
  toggleAudio,
  cleanup,
  getConfigInfo,
};
