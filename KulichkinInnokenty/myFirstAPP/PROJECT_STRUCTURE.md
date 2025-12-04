# Структура проекта

Минималистичное React Native приложение с черно-белым дизайном.

## Структура директорий

```
myFirstAPP/
├── app/                        # Expo Router - файловая маршрутизация
│   ├── (tabs)/                 # Табы приложения (сгруппированные роуты)
│   │   ├── index.tsx           # Главная страница
│   │   ├── explore.tsx         # Обзор технологий
│   │   ├── UseState/           # Демо useState hook
│   │   │   └── index.tsx
│   │   ├── UseEffect/          # Демо useEffect hook
│   │   │   └── index.tsx
│   │   ├── UseMemo/            # Демо useMemo hook
│   │   │   └── index.tsx
│   │   ├── Zustand/            # Демо Zustand state management
│   │   │   └── index.tsx
│   │   └── _layout.tsx         # Layout для табов
│   │
│   ├── auth/                   # Экраны авторизации
│   │   ├── login.tsx           # Вход
│   │   ├── register.tsx        # Регистрация
│   │   └── profile.tsx         # Профиль пользователя
│   │
│   ├── _layout.tsx             # Корневой layout приложения
│   └── modal.tsx               # Модальное окно
│
├── components/                 # React компоненты
│   ├── ui/                     # UI Kit - переиспользуемые компоненты
│   │   ├── Button.tsx          # Кнопки (5 вариантов)
│   │   ├── Card.tsx            # Карточки (3 варианта)
│   │   ├── Container.tsx       # Контейнеры для экранов
│   │   ├── Input.tsx           # Поля ввода
│   │   ├── Typography.tsx      # Типографика (H1-H4, Body, Caption)
│   │   └── index.tsx           # Экспорт компонентов
│   │
│   ├── external-link.tsx       # Внешние ссылки
│   ├── haptic-tab.tsx          # Табы с тактильной обратной связью
│   └── ...                     # Другие утилитные компоненты
│
├── store/                      # Zustand state management
│   └── authStore.ts            # Хранилище аутентификации
│
├── services/                   # API и сервисы
│   └── api.ts                  # HTTP клиент (Axios)
│
├── types/                      # TypeScript типы
│   ├── auth.ts                 # Типы для аутентификации
│   ├── ui.ts                   # Типы для UI компонентов
│   └── index.ts                # Центральный экспорт
│
├── hooks/                      # Custom React hooks
│   ├── use-color-scheme.ts     # Определение темы
│   └── use-theme-color.ts      # Цвета темы
│
├── constants/                  # Константы приложения
│   └── theme.ts                # Константы темы
│
├── assets/                     # Статичные ресурсы
│   └── images/                 # Изображения
│
├── scripts/                    # Утилитные скрипты
│   └── reset-project.js        # Сброс проекта
│
├── gluestack-ui.config.ts      # Конфигурация UI темы
├── tsconfig.json               # TypeScript конфигурация
├── package.json                # Зависимости проекта
├── app.json                    # Expo конфигурация
├── README.md                   # Документация
├── DESIGN.md                   # Гайд по дизайн-системе
└── PROJECT_STRUCTURE.md        # Этот файл
```

## Ключевые директории

### `/app` - Expo Router
Использует файловую маршрутизацию. Структура файлов определяет роуты:
- `(tabs)/` - группа табов (не создает роут)
- `auth/login.tsx` → `/auth/login`
- `_layout.tsx` - layout компонент

### `/components/ui` - UI Kit
Минималистичные переиспользуемые компоненты:
- **Card** - контейнеры контента (default, outlined, elevated)
- **Button** - кнопки (primary, secondary, outline, ghost, destructive)
- **Input** - поля ввода с валидацией
- **Typography** - иерархия текста (H1, H2, H3, H4, Body, Caption, Label)
- **Container** - обертки для экранов

### `/store` - State Management
Zustand для глобального состояния:
- `authStore.ts` - пользователь, токены, аутентификация

### `/services` - API Services
- `api.ts` - HTTP клиент с интерцепторами, автообновлением токенов

### `/types` - TypeScript Types
Централизованные типы и интерфейсы:
- `auth.ts` - User, LoginCredentials, RegisterData, AuthResponse
- `ui.ts` - типы для UI компонентов
- `index.ts` - реэкспорт всех типов

## Соглашения об именовании

### Файлы
- **Компоненты**: PascalCase (`Button.tsx`, `Card.tsx`)
- **Хуки**: camelCase с префиксом `use-` (`use-color-scheme.ts`)
- **Типы**: camelCase (`auth.ts`, `ui.ts`)
- **Утилиты**: camelCase (`api.ts`)

### Компоненты
- **Экраны**: суффикс `Screen` опционален (`LoginScreen` или `Login`)
- **UI компоненты**: описательные имена (`Button`, `Card`, `Input`)

### Типы
- **Интерфейсы**: PascalCase (`User`, `AuthState`)
- **Types**: PascalCase (`ButtonVariant`, `CardVariant`)

## Импорты

### Абсолютные импорты
```typescript
// Используйте @ алиас для корня проекта
import { Button, Card } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
```

### Относительные импорты
```typescript
// Внутри одной директории
import { H1, Body } from './Typography';
import api from '../services/api';
```

### Импорт типов
```typescript
// Централизованный импорт
import { User, LoginCredentials } from '@/types';

// Или напрямую
import { User } from '@/types/auth';
```

## Стилизация

### Inline StyleSheet
```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
});
```

### UI Kit компоненты
```typescript
// Используйте готовые компоненты
<Card variant="outlined">
  <H2>Заголовок</H2>
  <Body color="secondary">Текст</Body>
</Card>
```

## Маршрутизация

### Навигация между экранами
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Переход на экран
router.push('/auth/login');

// Возврат назад
router.back();

// Замена текущего экрана
router.replace('/');
```

### Параметры роутов
```typescript
// Передача параметров
router.push({
  pathname: '/auth/profile',
  params: { id: '123' }
});

// Получение параметров
import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams();
```

## State Management

### Zustand Store
```typescript
import useAuthStore from '@/store/authStore';

// В компоненте
const { user, login, logout } = useAuthStore();

// Вызов actions
await login({ email, password });
```

### Local State
```typescript
// useState для локального состояния
const [count, setCount] = useState(0);
```

## API Calls

### Через API Service
```typescript
import api from '@/services/api';

// Login
const response = await api.login({ email, password });

// Get Profile
const profile = await api.getProfile(token);
```

### Прямой вызов
```typescript
import axios from 'axios';

const response = await axios.get('/api/endpoint');
```

## Лучшие практики

### Компоненты
1. Один компонент = один файл
2. Используйте TypeScript типы для props
3. Разделяйте логику и UI
4. Используйте UI Kit компоненты

### Типы
1. Создавайте интерфейсы для всех данных
2. Используйте централизованные типы из `/types`
3. Избегайте `any`, используйте `unknown`

### Стили
1. Используйте UI Kit для единообразия
2. Следуйте черно-белой палитре
3. StyleSheet для кастомных стилей
4. Избегайте inline стилей

### State
1. Локальное состояние - `useState`
2. Глобальное состояние - Zustand
3. Побочные эффекты - `useEffect`
4. Мемоизация - `useMemo`, `useCallback`

## Добавление нового экрана

1. Создайте файл в `app/`
```typescript
// app/new-screen.tsx
import { Container, Card, H1 } from '@/components/ui';

export default function NewScreen() {
  return (
    <Container scrollable padding="md">
      <H1>Новый экран</H1>
      <Card variant="outlined">
        {/* Контент */}
      </Card>
    </Container>
  );
}
```

2. Добавьте типы (если нужно)
```typescript
// types/new-feature.ts
export interface NewFeature {
  id: string;
  name: string;
}
```

3. Добавьте в навигацию
```typescript
router.push('/new-screen');
```

## Добавление нового компонента UI

1. Создайте компонент
```typescript
// components/ui/NewComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface NewComponentProps {
  children: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    // Стили
  },
});
```

2. Экспортируйте
```typescript
// components/ui/index.tsx
export { NewComponent } from './NewComponent';
```

3. Используйте
```typescript
import { NewComponent } from '@/components/ui';
```

## Дополнительные ресурсы

- [README.md](./README.md) - Основная документация
- [DESIGN.md](./DESIGN.md) - Дизайн-система
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
