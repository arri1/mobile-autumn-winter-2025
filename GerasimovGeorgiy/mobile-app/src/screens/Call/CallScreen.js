import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import webrtcService from '../../services/webrtcService';
import socketService from '../../services/socketService';
import useAuthStore from '../../store/authStore';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0D0F14;
`;

const VideoContainer = styled.View`
  flex: 1;
  background-color: #000000;
  position: relative;
`;

const LocalVideoView = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 120px;
  height: 160px;
  background-color: #1C2230;
  border-radius: 12px;
  overflow: hidden;
  z-index: 10;
`;

const RemoteVideoView = styled.View`
  flex: 1;
  background-color: #000000;
  justify-content: center;
  align-items: center;
`;

const VideoPlaceholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #1C2230;
`;

const AvatarContainer = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #2A2F3A;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarIcon = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #5EEAD4;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #E6E9EF;
  margin-bottom: 8px;
`;

const StatusText = styled.Text`
  font-size: 18px;
  color: #5EEAD4;
  text-align: center;
`;

const ControlsContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const ControlButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${props => {
    if (props.variant === 'end') return '#EF4444';
    if (props.variant === 'mute') return props.active ? '#EF4444' : '#1C2230';
    return '#1C2230';
  }};
  border-width: ${props => props.variant === 'mute' && props.active ? '2px' : '0px'};
  border-color: #EF4444;
`;

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LoadingText = styled.Text`
  color: #E6E9EF;
  margin-top: 16px;
  font-size: 16px;
`;

export default function CallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, incomingCall } = route.params || {};
  const currentUser = useAuthStore((state) => state.user);
  
  const [status, setStatus] = useState(incomingCall ? 'Входящий звонок...' : 'Инициализация...');
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      setIsLoading(true);
      
      if (incomingCall) {
        // Обработка входящего звонка
        await handleIncomingCall();
      } else {
        // Инициация исходящего звонка
        await handleOutgoingCall();
      }
    } catch (error) {
      console.error('Error initializing call:', error);
      Alert.alert('Ошибка', 'Не удалось инициализировать звонок. ' + error.message);
      navigation.goBack();
    }
  };

  const handleOutgoingCall = async () => {
    if (!user?.id) {
      throw new Error('User not found');
    }

    setStatus('Подключение...');
    
    // Настраиваем обработчики для удаленного потока
    webrtcService.onRemoteStream((stream) => {
      console.log('Remote stream received:', stream);
      setRemoteStream(stream);
      setIsConnected(true);
      setStatus('Соединено');
      
      // В браузере прикрепляем поток к video элементу
      if (Platform.OS === 'web' && remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    webrtcService.onConnectionStateChange((state) => {
      console.log('Connection state:', state);
      if (state === 'connected') {
        setIsConnected(true);
        setStatus('Соединено');
      } else if (state === 'disconnected' || state === 'failed') {
        setStatus('Соединение разорвано');
        setTimeout(() => {
          handleEndCall();
        }, 2000);
      }
    });

    // Настраиваем обработчики входящих событий
    setupIncomingCallHandlers();

    // Инициируем звонок
    await webrtcService.initiateCall(user.id);
    
    // Получаем локальный поток
    const stream = await webrtcService.getLocalStream(true, true);
    setLocalStream(stream);
    
    // В браузере прикрепляем поток к video элементу
    if (Platform.OS === 'web' && localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    
    setStatus('Звонок...');
    setIsLoading(false);
  };

  const handleIncomingCall = async () => {
    const { offer } = route.params || {};
    
    if (!offer || !user?.id) {
      setStatus('Ожидание входящего звонка...');
      // Настраиваем обработчики Socket.IO для входящих звонков
      await socketService.connect();
      
      socketService.on('call:incoming', async ({ fromUserId, fromUserEmail, offer: incomingOffer }) => {
        if (fromUserId === user?.id) {
          await answerIncomingCall(fromUserId, incomingOffer);
        }
      });
    } else {
      // Звонок уже передан через навигацию
      await answerIncomingCall(user.id, offer);
    }
  };

  const answerIncomingCall = async (fromUserId, offer) => {
    try {
      setStatus('Входящий звонок...');
      
      // Настраиваем обработчики
      webrtcService.onRemoteStream((stream) => {
        setRemoteStream(stream);
        setIsConnected(true);
        setStatus('Соединено');
        
        if (Platform.OS === 'web' && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      webrtcService.onConnectionStateChange((state) => {
        if (state === 'connected') {
          setIsConnected(true);
          setStatus('Соединено');
        }
      });

      // Отвечаем на звонок
      await webrtcService.answerCall(fromUserId, offer);
      
      // Получаем локальный поток
      const stream = await webrtcService.getLocalStream(true, true);
      setLocalStream(stream);
      
      if (Platform.OS === 'web' && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error answering call:', error);
      Alert.alert('Ошибка', 'Не удалось ответить на звонок');
      navigation.goBack();
    }
  };

  const setupIncomingCallHandlers = async () => {
    await socketService.connect();
    
    socketService.on('call:incoming', async ({ fromUserId, fromUserEmail, offer }) => {
      // Обработка входящих звонков во время активного звонка
      Alert.alert('Входящий звонок', `Входящий звонок от ${fromUserEmail}. Текущий звонок будет завершен.`);
    });
  };

  const handleAnswerCall = async () => {
    // Уже обрабатывается в handleIncomingCall
  };

  const handleRejectCall = () => {
    if (user?.id) {
      webrtcService.rejectCall(user.id);
    }
    navigation.goBack();
  };

  const handleEndCall = () => {
    webrtcService.endCall();
    cleanup();
    navigation.goBack();
  };

  const handleToggleVideo = () => {
    const enabled = webrtcService.toggleVideo();
    setIsVideoEnabled(enabled);
  };

  const handleToggleAudio = () => {
    const enabled = webrtcService.toggleAudio();
    setIsAudioEnabled(enabled);
  };

  const cleanup = () => {
    webrtcService.cleanup();
    socketService.disconnect();
  };

  if (!user) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#EF4444', fontSize: 16 }}>Пользователь не найден</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20, padding: 12, backgroundColor: '#5EEAD4', borderRadius: 8 }}
          >
            <Text style={{ color: '#0D0F14', fontWeight: 'bold' }}>Назад</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <VideoContainer>
        {/* Удаленное видео */}
        <RemoteVideoView>
          {Platform.OS === 'web' ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <VideoPlaceholder>
              {remoteStream ? (
                <Text style={{ color: '#E6E9EF' }}>Видео поток активен</Text>
              ) : (
                <>
                  <AvatarContainer>
                    <AvatarIcon>
                      <Ionicons name="person" size={60} color="#0D0F14" />
                    </AvatarIcon>
                  </AvatarContainer>
                  <UserName>{user.name || 'Пользователь'}</UserName>
                  <StatusText>{status}</StatusText>
                </>
              )}
            </VideoPlaceholder>
          )}
        </RemoteVideoView>

        {/* Локальное видео */}
        {localStream && (
          <LocalVideoView>
            {Platform.OS === 'web' ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C2230' }}>
                <Ionicons name="videocam" size={40} color="#5EEAD4" />
              </View>
            )}
          </LocalVideoView>
        )}

        {/* Индикатор загрузки */}
        {isLoading && (
          <LoadingOverlay>
            <ActivityIndicator size="large" color="#5EEAD4" />
            <LoadingText>{status}</LoadingText>
          </LoadingOverlay>
        )}

        {/* Элементы управления */}
        {!isLoading && (
          <ControlsContainer>
            <ControlButton
              variant="mute"
              active={!isVideoEnabled}
              onPress={handleToggleVideo}
            >
              <Ionicons
                name={isVideoEnabled ? 'videocam' : 'videocam-off'}
                size={28}
                color={isVideoEnabled ? '#5EEAD4' : '#FFFFFF'}
              />
            </ControlButton>

            <ControlButton
              variant="mute"
              active={!isAudioEnabled}
              onPress={handleToggleAudio}
            >
              <Ionicons
                name={isAudioEnabled ? 'mic' : 'mic-off'}
                size={28}
                color={isAudioEnabled ? '#5EEAD4' : '#FFFFFF'}
              />
            </ControlButton>

            {incomingCall && !isConnected ? (
              <>
                <ControlButton
                  onPress={handleRejectCall}
                  variant="end"
                >
                  <Ionicons name="call" size={28} color="#FFFFFF" />
                </ControlButton>
                <ControlButton
                  onPress={handleAnswerCall}
                  style={{ backgroundColor: '#10B981' }}
                >
                  <Ionicons name="call" size={28} color="#FFFFFF" />
                </ControlButton>
              </>
            ) : (
              <ControlButton
                variant="end"
                onPress={handleEndCall}
              >
                <Ionicons name="call" size={28} color="#FFFFFF" />
              </ControlButton>
            )}
          </ControlsContainer>
        )}
      </VideoContainer>
    </Container>
  );
}
