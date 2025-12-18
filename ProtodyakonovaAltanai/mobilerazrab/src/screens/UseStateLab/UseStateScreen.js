import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

/**
 * Компонент для демонстрации работы React хука useState
 * Показывает три основных сценария использования:
 * 1. Числовое состояние (счетчик)
 * 2. Текстовое состояние (управляемый ввод)
 * 3. Логическое состояние (переключатель)
 */
const UseStateScreen = () => {
  const [count, setCount] = useState(0);  // 1. Числовое состояние - счетчик
  const [name, setName] = useState('');  // 2. Текстовое состояние - имя пользователя
  const [enabled, setEnabled] = useState(false);   // 3. Логическое состояние - включен/выключен

  /**
   * Увеличивает счетчик на 1
   * Демонстрирует обновление состояния на основе предыдущего значения
   */
  const increment = () => {
    setCount(count + 1);
  };

  /**
   * Уменьшает счетчик на 1
   */
  const decrement = () => {
    setCount(count - 1);
  };

  /**
   * Сбрасывает счетчик в 0
   */
  const reset = () => {
    setCount(0);
  };

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🔬</Emoji>
          <Title>UseState</Title>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Счетчик</CardTitle>
            <Pill tone={count >= 0 ? 'positive' : 'negative'}>
              {count >= 0 ? 'Положительный' : 'Отрицательный'}
            </Pill>
          </CardHeader>
          <Divider />
          <Row space>
            <CounterButton variant="reset" onPress={reset}>
              <BtnText>Reset</BtnText>
            </CounterButton>
            <CounterButton variant="decrement" onPress={decrement}>
              <BtnText>-1</BtnText>
            </CounterButton>
            <CounterValue>{count}</CounterValue>
            <CounterButton variant="increment" onPress={increment}>
              <BtnText>+1</BtnText>
            </CounterButton>
          </Row>
          <InfoText>
            {count > 0 
              ? 'Значение положительное' 
              : count < 0 
                ? 'Значение отрицательное' 
                : 'Значение равно нулю'}
          </InfoText>
          <InfoText small>
            {Math.abs(count) > 10 
              ? 'Вы достигли больших значений!' 
              : 'Продолжайте считать!'}
          </InfoText>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Управляемый ввод</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Введите ваше имя"
              placeholderTextColor="#889096"
            />
            <Helper>Привет, {name || 'гость'}!</Helper>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Переключатель</CardTitle>
            <Pill tone={enabled ? 'success' : 'neutral'}>
              {enabled ? 'ВКЛ' : 'ВЫКЛ'}
            </Pill>
          </CardHeader>
          <Divider />
          <Row>
            <Switch 
              value={enabled} 
              onValueChange={setEnabled}
              trackColor={{ false: '#767577', true: '#5eead4' }}
              thumbColor={enabled ? '#052925' : '#f4f3f4'}
            />
            <Helper ml12>
              Состояние: {enabled ? 'активно' : 'неактивно'}
            </Helper>
          </Row>
          <InfoText small>
            {enabled ? 'Функция включена' : 'Функция выключена'}
          </InfoText>
        </Card>

        <SummaryCard>
          <SummaryTitle>Сводка состояния</SummaryTitle>
          <Divider />
          <SummaryRow>
            <SummaryLabel>Счетчик:</SummaryLabel>
            <SummaryValue>{count}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Имя:</SummaryLabel>
            <SummaryValue>{name || 'не указано'}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Переключатель:</SummaryLabel>
            <SummaryValue tone={enabled ? 'success' : 'neutral'}>
              {enabled ? 'включен' : 'выключен'}
            </SummaryValue>
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

const SubTitle = styled(Text)`
  color: #9aa4b2;
  font-size: 16px;
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

export default UseStateScreen;