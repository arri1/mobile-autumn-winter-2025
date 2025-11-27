# Минималистичный черно-белый дизайн

## Философия дизайна

Этот проект использует минималистичный подход к дизайну с фокусом на:

1. **Монохромную палитру** - только черный, белый и оттенки серого
2. **Визуальную иерархию** - четкая структура через размеры и веса шрифтов
3. **Оптимальную читаемость** - правильные размеры текста и межстрочные интервалы
4. **Чистоту форм** - минимум декоративных элементов

## Цветовая палитра

### Основные цвета
- `#000000` - Primary (текст, акценты, кнопки)
- `#FFFFFF` - Background (фон карточек и контента)
- `#FAFAFA` - Background Alt (фон страниц)

### Градации серого (иерархия текста)
- `#000000` - Primary text (основной текст)
- `#525252` - Secondary text (второстепенный текст)
- `#A3A3A3` - Tertiary text (вспомогательный текст)
- `#D4D4D4` - Disabled text (неактивный текст)

### Границы и разделители
- `#E5E5E5` - Border (основные границы)
- `#D4D4D4` - Border Strong (акцентные границы)
- `#F5F5F5` - Border Subtle (тонкие разделители)

## Типографика

### Иерархия заголовков
```
H1: 36px / 48px line-height, weight: 700
H2: 30px / 40px line-height, weight: 700
H3: 24px / 32px line-height, weight: 600
H4: 20px / 28px line-height, weight: 600
```

### Текст
```
Body:       16px / 24px line-height, weight: 400
Body Small: 14px / 20px line-height, weight: 400
Caption:    12px / 16px line-height, weight: 400
Label:      14px / 20px line-height, weight: 600
```

### Веса шрифтов
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Компоненты UI

### Card
Три варианта карточек:
- `default` - белый фон без границ
- `outlined` - белый фон с тонкой границей #E5E5E5
- `elevated` - белый фон с тенью (shadowOpacity: 0.05)

Padding: 24px, Border radius: 8px

### Button
Пять вариантов кнопок:

#### Primary
- Background: `#000000`
- Text: `#FFFFFF`
- Использование: основные действия

#### Secondary
- Background: `#404040`
- Text: `#FFFFFF`
- Использование: второстепенные действия

#### Outline
- Background: `transparent`
- Border: `#000000` 1px
- Text: `#000000`
- Использование: альтернативные действия

#### Ghost
- Background: `transparent`
- Text: `#000000`
- Использование: третичные действия

#### Destructive
- Background: `#000000`
- Text: `#FFFFFF`
- Использование: опасные действия

#### Размеры
- Small: 32px min-height, 12px padding
- Medium: 44px min-height, 16px padding
- Large: 56px min-height, 24px padding

### Input
- Border: `#E5E5E5` 1px
- Border Error: `#000000` 2px
- Height: 48px
- Border radius: 6px
- Font size: 16px

### Container
- Padding options: none, sm (16px), md (24px), lg (32px)
- Background: white или gray (#FAFAFA)
- Поддержка scrollable mode

## Spacing System

```
0:    0px
px:   1px
0.5:  2px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
32:   128px
```

## Border Radius

```
none: 0px
xs:   2px
sm:   4px
md:   6px
lg:   8px
xl:   12px
2xl:  16px
3xl:  24px
full: 9999px
```

## Использование компонентов

### Импорт
```tsx
import {
  Container,
  Card,
  Button,
  Input,
  H1, H2, H3, H4,
  Body, Caption, Label
} from '@/components/ui';
```

### Пример страницы
```tsx
export default function Screen() {
  return (
    <Container scrollable padding="md">
      <H1>Заголовок страницы</H1>
      <Caption color="secondary">Описание</Caption>

      <Card variant="outlined">
        <H2>Заголовок карточки</H2>
        <Body color="secondary">Текст карточки</Body>

        <Button
          title="Действие"
          variant="primary"
          size="lg"
          onPress={() => {}}
        />
      </Card>
    </Container>
  );
}
```

## Принципы использования

### 1. Иерархия через размер
Используйте размеры шрифтов для создания визуальной иерархии:
- H1 для заголовков страниц
- H2 для заголовков секций
- H3 для подзаголовков
- Body для основного текста
- Caption для вспомогательной информации

### 2. Контраст через вес
Используйте разные веса шрифтов:
- Bold для важных элементов
- Semibold для акцентов
- Medium для выделения
- Normal для основного текста

### 3. Spacing для дыхания
Оставляйте достаточно пространства между элементами:
- 24-32px между секциями
- 16px внутри карточек
- 12px между связанными элементами
- 8px для близких элементов

### 4. Минимум цвета
Используйте только градации серого:
- Черный для основного текста и акцентов
- Серый для второстепенной информации
- Белый для фона

## Accessibility

- Минимальный размер интерактивных элементов: 44px
- Контраст текста соответствует WCAG AA
- Все интерактивные элементы имеют disabled состояния
- Поддержка клавиатурной навигации
