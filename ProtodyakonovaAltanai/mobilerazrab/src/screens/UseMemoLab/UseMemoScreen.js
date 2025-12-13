import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

/**
 * Вычисляет факториал числа
 * Сложность: O(n)
 * @param {number} n - Число для вычисления факториала
 * @returns {number} Факториал числа
 */
function factorial(n) {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Проверяет, является ли число простым
 * Сложность: O(√n)
 * @param {number} num - Число для проверки
 * @returns {boolean} true если число простое, false если составное
 */
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Основной компонент для демонстрации работы React хука useMemo
 * Показывает:
 * 1. Мемоизацию дорогостоящих вычислений
 * 2. Мемоизацию больших массивов данных
 * 3. Мемоизацию фильтрации и агрегации
 */
const UseMemoScreen = () => {
  // Состояние для ввода числа (математические вычисления)
  const [numberInput, setNumberInput] = useState('10');
  // Состояние для поискового запроса (фильтрация пользователей)
  const [query, setQuery] = useState('');

  // Преобразуем ввод в число
  const number = useMemo(() => {
    const num = parseInt(numberInput) || 0;
    return Math.min(100, Math.max(0, num)); // Ограничиваем диапазон для предотвращения переполнения
  }, [numberInput]);

  
  // Мемоизированные вычисления
  const factorialResult = useMemo(() => factorial(number), [number]);
  const isPrimeResult = useMemo(() => isPrime(number), [number]);
  const square = useMemo(() => number * number, [number]);
  const cube = useMemo(() => number * number * number, [number]);

  // Мемоизированный список пользователей
  const users = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({ 
        id: i + 1, 
        name: `Пользователь ${i + 1}`,
        email: `user${i + 1}@example.com`,
        score: Math.floor(Math.random() * 100) + 1,
        active: Math.random() > 0.3
      })),
    []
  );

  // Мемоизированная фильтрация пользователей
  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((user) => 
      user.name.toLowerCase().includes(q) || 
      user.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  // Мемоизированная статистика
  const stats = useMemo(() => {
    const activeUsers = filteredUsers.filter(u => u.active);
    const totalScore = filteredUsers.reduce((sum, user) => sum + user.score, 0);
    
    return {
      total: filteredUsers.length,
      active: activeUsers.length,
      averageScore: filteredUsers.length > 0 
        ? Math.round(totalScore / filteredUsers.length) 
        : 0,
      topScore: filteredUsers.length > 0 
        ? Math.max(...filteredUsers.map(u => u.score)) 
        : 0,
    };
  }, [filteredUsers]);

  // Мемоизированный текст информации
  const infoText = useMemo(() => {
    if (!query) return `Все пользователи (${users.length})`;
    return `Найдено ${filteredUsers.length} из ${users.length} пользователей`;
  }, [filteredUsers.length, users.length, query]);

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🧮</Emoji>
          <Title>UseMemo</Title>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Математические вычисления</CardTitle>
            <Pill tone={number <= 20 ? 'positive' : number <= 50 ? 'warning' : 'negative'}>
              {number <= 20 ? 'Легко' : number <= 50 ? 'Средне' : 'Сложно'}
            </Pill>
          </CardHeader>
          <Divider />
          <Column>
            <Row space>
              <Helper>Число (0-100):</Helper>
              <SmallInput
                value={String(numberInput)}
                keyboardType="number-pad"
                onChangeText={setNumberInput}
                placeholder="10"
                placeholderTextColor="#889096"
              />
            </Row>
            
            <Row space>
              <Column>
                <InfoText>Факториал:</InfoText>
                <CounterValue>{number}! = {factorialResult.toLocaleString()}</CounterValue>
              </Column>
              <Column>
                <InfoText>Квадрат:</InfoText>
                <CounterValue>{number}² = {square}</CounterValue>
              </Column>
            </Row>
            
            <Row space>
              <Column>
                <InfoText>Куб:</InfoText>
                <CounterValue>{number}³ = {cube}</CounterValue>
              </Column>
              <Column>
                <InfoText>Простое число:</InfoText>
                <CounterValue tone={isPrimeResult ? 'success' : 'neutral'}>
                  {isPrimeResult ? 'Да' : 'Нет'}
                </CounterValue>
              </Column>
            </Row>
            
            <InfoText>
              Все вычисления мемоизированы и обновляются только при изменении числа
            </InfoText>
            <InfoText small>
              {number > 20 
                ? `Факториал ${number}! вычисляется тяжело`
                : 'Вычисления происходят мгновенно'}
            </InfoText>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Фильтрация пользователей</CardTitle>
            <Pill tone={filteredUsers.length === users.length ? 'neutral' : 'success'}>
              {filteredUsers.length === users.length ? 'Все' : 'Поиск'}
            </Pill>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={query}
              onChangeText={setQuery}
              placeholder="Поиск по имени или email..."
              placeholderTextColor="#889096"
            />
            <Row space>
              <Helper>{infoText}</Helper>
              <Pill tone={query ? 'success' : 'neutral'} small>
                {query ? 'Активен' : 'Неактивен'}
              </Pill>
            </Row>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TagContainer>
                {filteredUsers.slice(0, 12).map((user) => (
                  <Tag key={user.id} active={user.active}>
                    <TagName>{user.name}</TagName>
                    <TagDetail>
                      <TagScore tone={user.score > 70 ? 'success' : user.score > 40 ? 'warning' : 'negative'}>
                        {user.score}
                      </TagScore>
                      <TagStatus active={user.active}>
                        {user.active ? '✓' : '✗'}
                      </TagStatus>
                    </TagDetail>
                  </Tag>
                ))}
              </TagContainer>
            </ScrollView>
            
            <InfoText small>Показываем первые 12 результатов</InfoText>
            
            <SummaryRow>
              <SummaryLabel>Всего пользователей:</SummaryLabel>
              <SummaryValue>{stats.total}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Активных:</SummaryLabel>
              <SummaryValue tone={stats.active > 0 ? 'success' : 'neutral'}>
                {stats.active}
              </SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Средний балл:</SummaryLabel>
              <SummaryValue>{stats.averageScore}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Максимальный балл:</SummaryLabel>
              <SummaryValue>{stats.topScore}</SummaryValue>
            </SummaryRow>
          </Column>
        </Card>

        <SummaryCard>
          <SummaryTitle>Сводка useMemo</SummaryTitle>
          <Divider />
          <SummaryRow>
            <SummaryLabel>Выбранное число:</SummaryLabel>
            <SummaryValue>{number}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Простое число:</SummaryLabel>
            <SummaryValue tone={isPrimeResult ? 'success' : 'neutral'}>
              {isPrimeResult ? 'Да' : 'Нет'}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Всего пользователей:</SummaryLabel>
            <SummaryValue>{users.length}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Найдено:</SummaryLabel>
            <SummaryValue tone={filteredUsers.length < users.length ? 'success' : 'neutral'}>
              {filteredUsers.length}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Статус мемоизации:</SummaryLabel>
            <SummaryValue tone="success">Все вычисления кешированы</SummaryValue>
          </SummaryRow>
        </SummaryCard>

        <BottomSpacer />
        <StatusBar style="light" />
      </Container>
    </SafeArea>
  );
};

// Стили
const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0a0c10;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

const Header = styled.View`
  margin-bottom: 32px;
  align-items: center;
`;

const Emoji = styled(Text)`
  font-size: 40px;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-size: 32px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 8px;
  text-align: center;
`;

const Card = styled.View`
  background-color: #0c0f14;
  border: 1px solid #1c2230;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CardTitle = styled(Text)`
  color: #e6e9ef;
  font-weight: 700;
  font-size: 18px;
`;

const Pill = styled(Text)`
  color: ${(p) => {
    if (p.tone === 'success') return '#5eead4';
    if (p.tone === 'positive') return '#2ecc71';
    if (p.tone === 'negative') return '#e74c3c';
    if (p.tone === 'warning') return '#f39c12';
    return '#b3b8c3';
  }};
  background-color: ${(p) => {
    if (p.tone === 'success') return '#0e2f25';
    if (p.tone === 'positive') return '#0d2a1d';
    if (p.tone === 'negative') return '#2d1a1a';
    if (p.tone === 'warning') return '#3d2c0d';
    return '#151a23';
  }};
  border: 1px solid ${(p) => {
    if (p.tone === 'success') return '#1f7a4a';
    if (p.tone === 'positive') return '#1f7a4a';
    if (p.tone === 'negative') return '#7a2a1f';
    if (p.tone === 'warning') return '#7a5a1f';
    return '#252a33';
  }};
  padding: ${(p) => (p.small ? '4px 8px' : '6px 12px')};
  border-radius: 999px;
  font-size: ${(p) => (p.small ? '11px' : '12px')};
  font-weight: 600;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  ${(p) => (p.space ? 'justify-content: space-between;' : '')}
  margin-bottom: 16px;
`;

const Column = styled.View`
  gap: 12px;
`;

const SmallInput = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 10px 14px;
  color: #e6e9ef;
  font-size: 16px;
  min-width: 80px;
  text-align: center;
`;

const CounterValue = styled(Text)`
  color: ${(p) => {
    if (p.tone === 'success') return '#5eead4';
    if (p.tone === 'neutral') return '#9aa4b2';
    return '#e6e9ef';
  }};
  font-size: 18px;
  font-weight: 700;
`;

const Input = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 14px 16px;
  color: #e6e9ef;
  font-size: 16px;
`;

const Helper = styled(Text)`
  color: #9aa4b2;
  font-size: 14px;
`;

const InfoText = styled(Text)`
  color: ${(p) => (p.small ? '#889096' : '#9aa4b2')};
  font-size: ${(p) => (p.small ? '13px' : '14px')};
  margin-top: ${(p) => (p.small ? '4px' : '8px')};
  font-style: ${(p) => (p.small ? 'italic' : 'normal')};
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

const Tag = styled.View`
  background-color: ${(p) => (p.active ? '#0e2f25' : '#151a23')};
  border: 1px solid ${(p) => (p.active ? '#1f7a4a' : '#252a33')};
  padding: 8px 12px;
  border-radius: 12px;
  min-width: 120px;
`;

const TagName = styled(Text)`
  color: #e6e9ef;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const TagDetail = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TagScore = styled(Text)`
  color: ${(p) => {
    if (p.tone === 'success') return '#5eead4';
    if (p.tone === 'warning') return '#f39c12';
    if (p.tone === 'negative') return '#e74c3c';
    return '#b3b8c3';
  }};
  font-size: 12px;
  font-weight: 700;
`;

const TagStatus = styled(Text)`
  color: ${(p) => (p.active ? '#2ecc71' : '#e74c3c')};
  font-size: 12px;
  font-weight: 700;
`;

const SummaryCard = styled(Card)`
  background-color: #0f1218;
  border-color: #3498db;
`;

const SummaryTitle = styled(Text)`
  color: #3498db;
  font-weight: 700;
  font-size: 18px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const SummaryLabel = styled(Text)`
  color: #bdc3c7;
  font-size: 15px;
`;

const SummaryValue = styled(Text)`
  color: ${(p) => {
    if (p.tone === 'success') return '#5eead4';
    if (p.tone === 'neutral') return '#9aa4b2';
    return '#e6e9ef';
  }};
  font-weight: 600;
  font-size: 15px;
`;

const BottomSpacer = styled.View`
  height: 40px;
`;

export default UseMemoScreen;