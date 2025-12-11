import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

const UseEffectScreen = () => {
  // Fetch demo - Кошачьи факты
  const [catFact, setCatFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const fetchCatFact = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const res = await fetch('https://catfact.ninja/fact', {
        signal: controller.signal,
      });
      const json = await res.json();
      setCatFact(json);
    } catch (e) {
      if (!e.name === 'AbortError') {
        setCatFact({fact: 'Ошибка загрузки факта о котиках 😿', length: 0});
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFact();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // Interval demo
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Dependent effect
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Привет, гость!');
  
  useEffect(() => {
    setGreeting(`Привет, ${name || 'гость'}!`);
  }, [name]);

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>⚛️</Emoji>
          <Title>UseEffect</Title>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Кошачьи факты 🐱</CardTitle>
            <Row>
              <Pill tone={loading ? 'neutral' : catFact ? 'success' : 'negative'}>
                {loading ? 'Загрузка...' : catFact ? 'Загружено' : 'Ошибка'}
              </Pill>
            </Row>
          </CardHeader>
          <Divider />
          <Column>
            {loading ? (
              <Row>
                <ActivityIndicator color="#5eead4" />
                <Helper ml12>Ищем интересный факт о котиках...</Helper>
              </Row>
            ) : (
              <>
                <Helper>Случайный факт:</Helper>
                <CardTitle>{catFact?.fact || '—'}</CardTitle>
                {catFact?.length > 0 && (
                  <InfoText small>Длина факта: {catFact.length} символов</InfoText>
                )}
              </>
            )}
            <Row space>
              <CounterButton variant="reset" onPress={() => fetchCatFact()}>
                <BtnText>Новый факт</BtnText>
              </CounterButton>
              <CounterButton variant="reset" onPress={() => abortRef.current?.abort()}>
                <BtnText>Отменить</BtnText>
              </CounterButton>
            </Row>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Интервал</CardTitle>
            <Pill tone={running ? 'success' : 'neutral'}>
              {running ? 'Запущен' : 'На паузе'}
            </Pill>
          </CardHeader>
          <Divider />
          <Row space>
            <CounterButton variant="decrement" onPress={() => setRunning((v) => !v)}>
              <BtnText>{running ? 'Пауза' : 'Старт'}</BtnText>
            </CounterButton>
            <CounterValue>{seconds}s</CounterValue>
            <CounterButton variant="reset" onPress={() => setSeconds(0)}>
              <BtnText>Сброс</BtnText>
            </CounterButton>
          </Row>
          <InfoText small>
            {running ? 'Таймер активен' : 'Таймер на паузе'}
          </InfoText>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Зависимости</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Введите ваше имя"
              placeholderTextColor="#889096"
            />
            <Helper>{greeting}</Helper>
          </Column>
          <InfoText small>
            useEffect срабатывает при изменении имени
          </InfoText>
        </Card>

        <SummaryCard>
          <SummaryTitle>Сводка состояния</SummaryTitle>
          <Divider />
          <SummaryRow>
            <SummaryLabel>Факт о котиках:</SummaryLabel>
            <SummaryValue tone={catFact ? 'success' : 'neutral'}>
              {catFact ? 'Загружен' : 'Не загружен'}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Длина факта:</SummaryLabel>
            <SummaryValue>{catFact?.length || 0} симв.</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Таймер:</SummaryLabel>
            <SummaryValue>{seconds} секунд</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Статус таймера:</SummaryLabel>
            <SummaryValue tone={running ? 'success' : 'neutral'}>
              {running ? 'Активен' : 'На паузе'}
            </SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Имя:</SummaryLabel>
            <SummaryValue>{name || 'не указано'}</SummaryValue>
          </SummaryRow>
        </SummaryCard>

        <BottomSpacer />
        <StatusBar style="light" />
      </Container>
    </SafeArea>
  );
};

// Стили (оставляем как в UseStateScreen.js)
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
    return '#b3b8c3';
  }};
  background-color: ${(p) => {
    if (p.tone === 'success') return '#0e2f25';
    if (p.tone === 'positive') return '#0d2a1d';
    if (p.tone === 'negative') return '#2d1a1a';
    return '#151a23';
  }};
  border: 1px solid ${(p) => {
    if (p.tone === 'success') return '#1f7a4a';
    if (p.tone === 'positive') return '#1f7a4a';
    if (p.tone === 'negative') return '#7a2a1f';
    return '#252a33';
  }};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
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

const CounterButton = styled.TouchableOpacity`
  background-color: ${(p) => {
    if (p.variant === 'reset') return 'transparent';
    if (p.variant === 'increment') return '#2ecc71';
    if (p.variant === 'decrement') return '#e74c3c';
    return '#5eead4';
  }};
  border: ${(p) => (p.variant === 'reset' ? '1px solid #2a2f3a' : 'none')};
  padding: 12px 16px;
  border-radius: 12px;
  min-width: 70px;
  align-items: center;
`;

const BtnText = styled(Text)`
  color: ${(p) => (p.variant === 'reset' ? '#9aa4b2' : '#052925')};
  font-weight: 700;
  font-size: 16px;
`;

CounterButton.defaultProps = {
  variant: 'default'
};

BtnText.defaultProps = {
  variant: 'default'
};

const CounterValue = styled(Text)`
  color: #e6e9ef;
  font-size: 28px;
  font-weight: 700;
  margin: 0 20px;
  min-width: 60px;
  text-align: center;
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
  ${(p) => (p.ml12 ? 'margin-left: 12px;' : '')}
`;

const InfoText = styled(Text)`
  color: ${(p) => (p.small ? '#889096' : '#9aa4b2')};
  font-size: ${(p) => (p.small ? '13px' : '14px')};
  margin-top: ${(p) => (p.small ? '4px' : '8px')};
  font-style: ${(p) => (p.small ? 'italic' : 'normal')};
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

export default UseEffectScreen;