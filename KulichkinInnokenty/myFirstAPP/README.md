# Минималистичное React Native приложение

Демонстрационное приложение с **черно-белым минималистичным дизайном**, акцентом на иерархию и читаемость.

## Особенности

- Минималистичный черно-белый UI Kit
- Zustand для управления состоянием
- Аутентификация с JWT токенами
- TypeScript
- Expo Router (файловая маршрутизация)
- Адаптивные компоненты

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск приложения

```bash
npx expo start
```

Выберите платформу:
- **a** - Android эмулятор
- **i** - iOS симулятор
- **w** - веб-версия

## Структура проекта

```
app/
├── (tabs)/           # Основные табы
│   ├── index.tsx     # Главная страница
│   ├── explore.tsx   # Обзор технологий
│   └── Zustand/      # Zustand демо
├── auth/             # Экраны авторизации
│   ├── login.tsx
│   ├── register.tsx
│   └── profile.tsx
└── _layout.tsx       # Корневой layout

components/
└── ui/               # UI Kit компоненты
    ├── Card.tsx
    ├── Button.tsx
    ├── Input.tsx
    ├── Typography.tsx
    └── Container.tsx

store/
└── authStore.ts      # Zustand store

gluestack-ui.config.ts # Конфигурация темы
```

## UI Kit

### Компоненты

#### Typography
```tsx
import { H1, H2, H3, Body, Caption, Label } from '@/components/ui';

<H1>Заголовок</H1>
<Body color="secondary">Текст</Body>
<Caption color="tertiary">Подпись</Caption>
```

#### Button
```tsx
import { Button } from '@/components/ui';

<Button
  title="Действие"
  variant="primary"    // primary, outline, ghost, destructive
  size="lg"            // sm, md, lg
  onPress={() => {}}
/>
```

#### Card
```tsx
import { Card } from '@/components/ui';

<Card variant="outlined">
  <H2>Заголовок</H2>
  <Body>Содержимое карточки</Body>
</Card>
```

#### Input
```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  placeholder="Введите email"
  value={email}
  onChangeText={setEmail}
/>
```

### Цветовая палитра

```
#000000 - Primary (текст, акценты)
#525252 - Secondary text
#A3A3A3 - Tertiary text
#E5E5E5 - Borders
#FAFAFA - Background
#FFFFFF - Surface
```

## Технологии

- **React Native** - кроссплатформенная разработка
- **Expo** - инструменты и сервисы
- **TypeScript** - типизация
- **Zustand** - управление состоянием
- **Axios** - HTTP клиент
- **AsyncStorage** - локальное хранилище
- **Expo Router** - навигация

## Авторизация

Приложение использует JWT токены для аутентификации:

### Demo credentials
```
Email: demo@example.com
Password: demo123
```

### API Endpoints
- `POST /auth/login` - вход
- `POST /auth/register` - регистрация
- `GET /auth/profile` - профиль пользователя

## Дизайн система

Подробная документация по дизайну в [DESIGN.md](./DESIGN.md)

### Принципы

1. **Минимализм** - только необходимые элементы
2. **Иерархия** - четкая визуальная структура
3. **Читаемость** - оптимальные размеры и интервалы
4. **Контраст** - монохромная палитра

## Разработка

### Добавление нового экрана

1. Создайте файл в `app/`
2. Используйте компоненты из `components/ui`
3. Следуйте дизайн-системе

Пример:
```tsx
import { Container, Card, H1, Body } from '@/components/ui';

export default function NewScreen() {
  return (
    <Container scrollable padding="md">
      <H1>Новый экран</H1>
      <Card variant="outlined">
        <Body>Содержимое</Body>
      </Card>
    </Container>
  );
}
```

### Добавление нового компонента UI

Все компоненты должны:
- Использовать черно-белую палитру
- Поддерживать варианты (variants)
- Иметь TypeScript типы
- Следовать spacing системе

## Полезные команды

```bash
# Запуск
npm start

# Линтинг
npm run lint

# Сброс проекта
npm run reset-project

# Сборка для Android
npm run android

# Сборка для iOS
npm run ios

# Веб-версия
npm run web
```

## Лицензия

MIT
