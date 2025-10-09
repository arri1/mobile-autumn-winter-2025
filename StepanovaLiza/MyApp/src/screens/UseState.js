import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Switch, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';


export default function UseState() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);

  return (
    <SafeArea>
      <Container>
        <Header>
          <Title>useState</Title>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Счетчик</CardTitle>
            <Pill tone={count < 0  ? 'neutral' : 'success'}>{count >= 0 ? 'Положительное' : 'Отрицательное'}
            </Pill>
          </CardHeader>
          <Divider />
          <Row space>
            
            <CounterButton onPress={() => setCount((v) => v - 1)}>
              <BtnText>-1</BtnText>
            </CounterButton>
            <CounterValue>{count}</CounterValue>
            <CounterButton onPress={() => setCount((v) => v + 1)}>
              <BtnText>+1</BtnText>
            </CounterButton>
            <CounterButton variant={count === 0 ? "ghost" : "default"}  onPress={() => setCount(0)}>
              <BtnText>Reset</BtnText>
            </CounterButton>
          </Row>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ввод</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Введите имя"
              placeholderTextColor="#889096"
            />
            <Divider />
            <Helper color="#ffffffff">Привет, {name || 'гость'}!</Helper>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Переключатель</CardTitle>
            <Pill tone={enabled ? 'success' : 'neutral'}>{enabled ? 'включено' : 'выключено'}</Pill>
          </CardHeader>
          <Divider />
          <Row>
            <Switch value={enabled} onValueChange={setEnabled} />
            <Helper ml12>Состояние: {enabled ? 'включено' : 'выключено'}</Helper>
          </Row>
        </Card>

        <BottomSpacer />
        <StatusBar style="auto" />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled.View`
  flex: 1;
  background-color: #0f2042ff;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  padding-top: 60px;
`;

const Header = styled(View)`
  margin-bottom: 16px;
  align-items: center;
  text-align: center;
`;

const Emoji = styled(Text)`
  font-size: 28px;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 6px;
`;

const SubTitle = styled(Text)`
  color: #9aa4b2;
`;

const Card = styled.View`
  background-color: #0c0f14;
  border: 1px solid #1c2230;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled(Text)`
  color: #e6e9ef;
  font-weight: 700;
`;

const Pill = styled(Text)`
  color: #b3b8c3;
  background-color: ${(p) => (p.tone === 'success' ? '#0e2f25' : '#552525ff')};
  border: 1px solid ${(p) => (p.tone === 'success' ? '#1f7a4a' : '#dc595bff')};
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  ${(p) => (p.space ? 'justify-content: space-between;' : '')};
`;

const Column = styled.View`
  gap: 8px;
`;

const CounterButton = styled.TouchableOpacity`
  background-color: ${(p) => (p.variant === 'ghost' ? 'transparent' : '#4b87a2ff')};
  border: ${(p) => (p.variant === 'ghost' ? '1px solid #2a2f3a' : 'none')};
  padding: 10px 14px;
  border-radius: 12px;
`;

const BtnText = styled(Text)`
  color: #052925;
  font-weight: 700;
`;

const CounterValue = styled(Text)`
  color: #e6e9ef;
  font-size: 22px;
  font-weight: 700;
  margin: 0 16px;
`;

const Input = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px 14px;
  color: #e6e9ef;
`;

const Helper = styled(Text)`
  color: ${(p) => p.color || '#9aa4b2'};
  ${(p) => (p.ml12 ? 'margin-left: 12px;' : '')};
  align-items: center;
  text-align: center;
`;

const BottomSpacer = styled.View`
  height: 24px;
`;