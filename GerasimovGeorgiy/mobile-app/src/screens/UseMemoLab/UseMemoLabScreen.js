import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput } from 'react-native';
import styled from 'styled-components/native';

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export default function UseMemoLabScreen() {
  const [fibInput, setFibInput] = useState('10');
  const [query, setQuery] = useState('');

  const fibNumber = Number.isNaN(Number(fibInput)) ? 0 : Math.min(35, Math.max(0, Number(fibInput)));

  const fibResult = useMemo(() => fibonacci(fibNumber), [fibNumber]);

  const data = useMemo(
    () =>
      Array.from({ length: 500 }, (_, i) => ({ id: i + 1, label: `Элемент ${i + 1}` })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => item.label.toLowerCase().includes(q));
  }, [data, query]);

  const infoText = useMemo(() => `Показано ${filtered.length} из ${data.length}`, [filtered.length, data.length]);

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🧮</Emoji>
          <Title>useMemo Лаборатория</Title>
          <SubTitle>Кеширование тяжелых вычислений и производительная фильтрация</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Тяжелое вычисление (Fibonacci)</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Row>
              <Label>n (0–35)</Label>
              <SmallInput
                value={String(fibInput)}
                keyboardType="number-pad"
                onChangeText={setFibInput}
                placeholder="10"
                placeholderTextColor="#889096"
              />
            </Row>
            <Helper>
              fib({fibNumber}) = <Bold>{fibResult}</Bold>
            </Helper>
            <Helper>
              Значение пересчитывается только при изменении n благодаря useMemo
            </Helper>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Фильтрация большого списка</CardTitle>
          </CardHeader>
          <Divider />
          <Column>
            <Input
              value={query}
              onChangeText={setQuery}
              placeholder="Поиск по элементам"
              placeholderTextColor="#889096"
            />
            <Helper>{infoText}</Helper>
            <TagRow horizontal showsHorizontalScrollIndicator={false}>
              {filtered.slice(0, 10).map((item) => (
                <Tag key={item.id}>
                  <TagText>{item.label}</TagText>
                </Tag>
              ))}
            </TagRow>
            <Helper>Показываем первые 10 результатов для наглядности</Helper>
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

const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

const Column = styled.View`
  gap: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled(Text)`
  color: #9aa4b2;
`;

const SmallInput = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 8px 12px;
  color: #e6e9ef;
  min-width: 80px;
  text-align: center;
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
`;

const Bold = styled(Text)`
  color: #e6e9ef;
  font-weight: 700;
`;

const TagRow = styled.ScrollView`
  margin: 8px 0;
`;

const Tag = styled.View`
  background-color: #151a23;
  border: 1px solid #252a33;
  padding: 6px 10px;
  border-radius: 999px;
  margin-right: 8px;
`;

const TagText = styled(Text)`
  color: #b3b8c3;
`;

const BottomSpacer = styled.View`
  height: 24px;
`;


