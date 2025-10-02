import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useStore } from '../../store/useStore';

export default function ZustandLabScreen() {
  const { count, name, theme, enabled, inputValue, increment, decrement, reset, setName, toggleTheme, setEnabled, setInputValue } = useStore();

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🐻</Emoji>
          <Title>Zustand Лаборатория</Title>
          <SubTitle>Глобальное состояние без провайдеров</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Глобальный счетчик</CardTitle>
            <Pill tone={count >= 0 ? 'success' : 'neutral'}>{count >= 0 ? 'positive' : 'negative'}</Pill>
          </CardHeader>
          <Divider />
          <CenterColumn>
            <BigCounterValue>{count}</BigCounterValue>
            <ButtonRow>
              <ActionButton onPress={decrement}>
                <ActionText>−</ActionText>
              </ActionButton>
              <ActionButton variant="reset" onPress={reset}>
                <ActionText>0</ActionText>
              </ActionButton>
              <ActionButton onPress={increment}>
                <ActionText>+</ActionText>
              </ActionButton>
            </ButtonRow>
            <Helper>Этот счетчик синхронизирован с useState экраном</Helper>
          </CenterColumn>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Профиль пользователя</CardTitle>
            <Pill tone={name ? 'success' : 'neutral'}>{name ? 'заполнен' : 'пустой'}</Pill>
          </CardHeader>
          <Divider />
          <Column>
            <Label>Имя пользователя</Label>
            <LargeInput
              value={name}
              onChangeText={setName}
              placeholder="Введите ваше имя"
              placeholderTextColor="#889096"
            />
            <WelcomeText>👋 Добро пожаловать, {name || 'гость'}!</WelcomeText>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Настройки приложения</CardTitle>
          </CardHeader>
          <Divider />
          <SettingsRow>
            <SettingsLabel>Темная тема</SettingsLabel>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </SettingsRow>
          <SettingsRow>
            <SettingsLabel>Дополнительные функции</SettingsLabel>
            <Switch value={enabled} onValueChange={setEnabled} />
          </SettingsRow>
          <Helper>Эти настройки влияют на все экраны приложения</Helper>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые заметки</CardTitle>
            <Pill tone={inputValue ? 'success' : 'neutral'}>{inputValue ? 'есть текст' : 'пусто'}</Pill>
          </CardHeader>
          <Divider />
          <Column>
            <Label>Заметка</Label>
            <TextArea
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Запишите что-нибудь..."
              placeholderTextColor="#889096"
              multiline
              numberOfLines={3}
            />
            <Helper>Символов: {inputValue.length}</Helper>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Преимущества Zustand</CardTitle>
          </CardHeader>
          <Divider />
          <FeatureList>
            <FeatureItem>🚀 Производительность — только нужные компоненты перерендериваются</FeatureItem>
            <FeatureItem>📦 Минимум кода — никаких провайдеров и контекстов</FeatureItem>
            <FeatureItem>🔗 Глобальность — состояние доступно везде</FeatureItem>
            <FeatureItem>⚡ Скорость — быстрее Redux и Context API</FeatureItem>
          </FeatureList>
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

const CenterColumn = styled.View`
  align-items: center;
  gap: 16px;
`;

const BigCounterValue = styled(Text)`
  color: #5eead4;
  font-size: 48px;
  font-weight: 700;
  text-align: center;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${(p) => (p.variant === 'reset' ? '#2a2f3a' : '#5eead4')};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const ActionText = styled(Text)`
  color: ${(p) => (p.variant === 'reset' ? '#e6e9ef' : '#052925')};
  font-size: 24px;
  font-weight: 700;
`;

const Label = styled(Text)`
  color: #b3b8c3;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const LargeInput = styled(TextInput)`
  background-color: #0f1218;
  border: 2px solid #1c2230;
  border-radius: 16px;
  padding: 16px 18px;
  color: #e6e9ef;
  font-size: 16px;
`;

const WelcomeText = styled(Text)`
  color: #5eead4;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
`;

const SettingsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const SettingsLabel = styled(Text)`
  color: #e6e9ef;
  font-size: 16px;
  font-weight: 500;
`;

const TextArea = styled(TextInput)`
  background-color: #0f1218;
  border: 2px solid #1c2230;
  border-radius: 16px;
  padding: 16px 18px;
  color: #e6e9ef;
  font-size: 16px;
  min-height: 80px;
  text-align-vertical: top;
`;

const FeatureList = styled.View`
  gap: 12px;
`;

const FeatureItem = styled(Text)`
  color: #9aa4b2;
  font-size: 14px;
  line-height: 20px;
`;

const Helper = styled(Text)`
  color: #9aa4b2;
  ${(p) => (p.ml12 ? 'margin-left: 12px;' : '')};
`;

const BottomSpacer = styled.View`
  height: 24px;
`;
