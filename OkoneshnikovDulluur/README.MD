Проект: Мобильное приложение (React Native + Expo)

Запуск приложения

1. Установите Node.js LTS (если не установлен)
2. Установите Expo CLI (необязательно, можно через npm scripts)

Команды

```bash
cd mobile-app
npm run ios    # Запуск в iOS Simulator (macOS + Xcode)
npm run android # Запуск в Android Emulator (Android Studio)
npm run web     # Запуск в браузере
npm start       # Открыть Expo Dev Tools
```

Структура

- `mobile-app` — Expo-проект с TypeScript
- `mobile-app/App.tsx` — стартовый экран с приветствием

Заметки

- Для iOS требуется Xcode, для Android — Android Studio и эмулятор/устройство.
- Можно сканировать QR-код Expo Go на устройстве для запуска без эмулятора.