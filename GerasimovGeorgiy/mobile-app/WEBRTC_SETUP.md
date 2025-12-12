# Настройка полноценного видеозвонка

## Текущая реализация

Реализован полноценный видеозвонок с поддержкой:
- ✅ WebRTC соединение через браузер (Expo Web)
- ✅ Socket.IO для сигналинга (обмен SDP и ICE candidates)
- ✅ Видео и аудио потоки
- ✅ Управление звонком (включить/выключить видео/аудио)
- ✅ Обработка входящих и исходящих звонков

## Ограничения Expo

Для полноценной работы на мобильных устройствах (iOS/Android) требуется:

### Вариант 1: Development Build (рекомендуется)

1. Установите `react-native-webrtc`:
```bash
npm install react-native-webrtc
```

2. Создайте development build:
```bash
npx expo prebuild
npx expo run:ios
# или
npx expo run:android
```

3. Обновите `webrtcService.js` для использования react-native-webrtc:
```javascript
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';

// В начале компонента или сервиса:
webrtcService.setRTCPeerConnection(RTCPeerConnection);
```

### Вариант 2: Использование Expo Web (текущая реализация)

Текущая реализация работает в браузере через Expo Web:
```bash
npm start
# Нажмите 'w' для запуска в браузере
```

## Как протестировать

### 1. Запустите бэкенд

```bash
cd test-backend
npm start
```

Бэкенд должен запуститься на `http://localhost:3000` с Socket.IO сервером.

### 2. Запустите мобильное приложение

```bash
cd mobile-app
npm start
```

### 3. Тестирование в браузере (Expo Web)

1. Нажмите `w` для запуска в браузере
2. Откройте приложение в двух разных вкладках браузера
3. Войдите под разными пользователями
4. На первом устройстве найдите второго пользователя и нажмите кнопку звонка
5. На втором устройстве появится уведомление о входящем звонке
6. Примите звонок - должно установиться WebRTC соединение

### 4. Тестирование на мобильных устройствах

Для тестирования на реальных устройствах требуется development build с `react-native-webrtc`.

## Структура реализации

### Бэкенд

- `src/services/socketService.js` - Socket.IO сервер для сигналинга
- `src/controllers/webrtcController.js` - Конфигурация STUN/TURN серверов

### Фронтенд

- `src/services/socketService.js` - Socket.IO клиент
- `src/services/webrtcService.js` - WebRTC сервис для управления соединениями
- `src/screens/Call/CallScreen.js` - Экран видеозвонка

## События Socket.IO

### Клиент → Сервер

- `call:initiate` - Инициация звонка (отправка offer)
- `call:answer` - Ответ на звонок (отправка answer)
- `call:reject` - Отклонение звонка
- `call:end` - Завершение звонка
- `ice:candidate` - Отправка ICE candidate

### Сервер → Клиент

- `call:incoming` - Входящий звонок (получение offer)
- `call:answered` - Звонок принят (получение answer)
- `call:rejected` - Звонок отклонен
- `call:ended` - Звонок завершен
- `ice:candidate` - Получение ICE candidate

## Настройка STUN/TURN серверов

По умолчанию используются:
- Публичные STUN серверы Google
- Бесплатные TURN серверы от Metered.ca

Для продакшена рекомендуется настроить свои TURN серверы в `.env`:

```env
TURN_SERVERS='[{"urls":"turn:your-turn-server.com:3478","username":"user","credential":"pass"}]'
```

## Troubleshooting

### Проблема: Видео не отображается в браузере

**Решение:**
- Убедитесь, что браузер поддерживает WebRTC
- Проверьте разрешения на камеру/микрофон
- Откройте консоль браузера для отладки

### Проблема: Соединение не устанавливается

**Решение:**
- Проверьте, что Socket.IO подключен (должны быть логи в консоли)
- Проверьте настройки CORS на бэкенде
- Убедитесь, что оба устройства в одной сети или используют публичные TURN серверы

### Проблема: Аудио/видео не работает на мобильных

**Решение:**
- Используйте development build с `react-native-webrtc`
- Проверьте разрешения на камеру/микрофон в настройках устройства
- Убедитесь, что используете HTTPS или localhost (WebRTC требует безопасное соединение)

## Дополнительные улучшения

Для продакшена рекомендуется:

1. **Сигналинг через WebSocket вместо Socket.IO** (опционально)
2. **TURN серверы** для работы через NAT/firewall
3. **Recording звонков** (если требуется)
4. **Screen sharing** (демонстрация экрана)
5. **Group calls** (групповые звонки)
6. **Chat во время звонка** (текстовые сообщения)

