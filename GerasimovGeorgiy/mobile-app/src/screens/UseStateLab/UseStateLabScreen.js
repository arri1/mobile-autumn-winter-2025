import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useStore } from '../../store/useStore';

export default function UseStateLabScreen() {
  const { count, name, enabled, inputValue, increment, decrement, reset, setName, setEnabled, setInputValue } = useStore();

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🧪</Emoji>
          <Title>useState Лаборатория</Title>
          <SubTitle>Три простых примера управления состоянием</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Счетчик</CardTitle>
            <Pill>{count >= 0 ? 'non-negative' : 'negative'}</Pill>
          </CardHeader>
          <Divider />
          <Row space>
            <CounterButton variant="ghost" onPress={reset}>
              <BtnText>Reset</BtnText>
            </CounterButton>
            <CounterButton onPress={decrement}>
              <BtnText>-1</BtnText>
            </CounterButton>
            <CounterValue>{count}</CounterValue>
            <CounterButton onPress={increment}>
              <BtnText>+1</BtnText>
            </CounterButton>
          </Row>
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
              placeholder="Введите имя"
              placeholderTextColor="#889096"
            />
            <Helper>Привет, {name || 'гость'}!</Helper>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Дополнительный ввод</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Связанный ввод"
              placeholderTextColor="#889096"
            />
            <Helper>Значение: {inputValue || 'пусто'}</Helper>
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

        <Card>
          <CardHeader>
            <CardTitle>Связанное состояние</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Helper>• Счетчик синхронизирован с Zustand Lab</Helper>
            <Helper>• Имя пользователя общее для всех экранов</Helper>
            <Helper>• Переключатель работает глобально</Helper>
            <Helper>• Дополнительный ввод связан между экранами</Helper>
          </Column>
        </Card>

        <BottomSpacer />
        <StatusBar style="auto" />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0a0c10;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
`;

const Header = styled.View`
  margin-bottom: 16px;
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
  background-color: ${(p) => (p.tone === 'success' ? '#0e2f25' : '#151a23')};
  border: 1px solid ${(p) => (p.tone === 'success' ? '#1f7a4a' : '#252a33')};
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
  background-color: ${(p) => (p.variant === 'ghost' ? 'transparent' : '#5eead4')};
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
  color: #9aa4b2;
  ${(p) => (p.ml12 ? 'margin-left: 12px;' : '')};
`;

const BottomSpacer = styled.View`
  height: 24px;
`;
