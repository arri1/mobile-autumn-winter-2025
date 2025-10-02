import { useMemo, useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, ActivityIndicator,View } from 'react-native';
import styled from 'styled-components/native';

// Global calculation counter to track fibonacci calls
let fibCalculationCount = 0;

function fibonacci(n) {
  fibCalculationCount++;
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Expensive operation simulation
function expensiveCalculation(n) {
  let result = 0;
  for (let i = 0; i < n * 100000; i++) {
    result += Math.sqrt(i);
  }
  return Math.floor(result);
}

export default function UseMemoLabScreen() {
  return <View></View>;
  const [fibInput, setFibInput] = useState('10');
  const [query, setQuery] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const [expensiveInput, setExpensiveInput] = useState('5');
  const [showDemo, setShowDemo] = useState(true);

  const fibNumber = Number.isNaN(Number(fibInput))
    ? 0
    : Math.min(30, Math.max(0, Number(fibInput)));
  const expensiveNumber = Number.isNaN(Number(expensiveInput))
    ? 0
    : Math.min(10, Math.max(0, Number(expensiveInput)));

  // Track component renders
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  });

  // Memoized fibonacci calculation with performance tracking
  const fibResult = useMemo(() => {
    console.log('🔄 Calculating Fibonacci...');
    fibCalculationCount = 0;
    const start = performance.now();
    const result = fibonacci(fibNumber);
    const end = performance.now();
    return { value: result, calls: fibCalculationCount, time: end - start };
  }, [fibNumber]);

  // Memoized expensive calculation
  const expensiveResult = useMemo(() => {
    console.log('💻 Running expensive calculation...');
    const start = performance.now();
    const result = expensiveCalculation(expensiveNumber);
    const end = performance.now();
    return { value: result, time: end - start };
  }, [expensiveNumber]);

  // Large dataset with memoization
  const largeDataset = useMemo(() => {
    console.log('📊 Generating large dataset...');
    return Array.from({ length: 1500 }, (_, i) => ({
      id: i + 1,
      label: `Элемент ${i + 1}`,
      category: ['Категория A', 'Категория B', 'Категория C', 'Категория D'][i % 4],
      value: Math.floor(Math.random() * 1000),
      isActive: Math.random() > 0.5,
    }));
  }, []);

  // Filtered and sorted data with memoization
  const processedData = useMemo(() => {
    console.log('🔍 Processing and filtering data...');
    const start = performance.now();

    let result = largeDataset;

    // Filter by query
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
      );
    }

    // Sort by value (expensive operation)
    result = result.sort((a, b) => b.value - a.value);

    const end = performance.now();
    return { data: result, processingTime: end - start };
  }, [largeDataset, query]);

  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🧮</Emoji>
          <Title>useMemo Лаборатория</Title>
          <SubTitle>Демонстрация мемоизации и оптимизации производительности</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>🧮 Fibonacci с мемоизацией</CardTitle>
            <StatusBadge>useMemo активен</StatusBadge>
          </CardHeader>
          <Divider />
          <Column>
            <InputRow>
              <Label>Число (0–30):</Label>
              <NumberInput
                value={String(fibInput)}
                keyboardType="number-pad"
                onChangeText={setFibInput}
                placeholder="10"
                placeholderTextColor="#889096"
              />
            </InputRow>

            <ResultDisplay>
              <ResultLabel>fib({fibNumber}) =</ResultLabel>
              <ResultValue>{fibResult.value.toLocaleString()}</ResultValue>
            </ResultDisplay>

            <MetricsGrid>
              <MetricCard>
                <MetricTitle>Время расчета</MetricTitle>
                <MetricValue>{fibResult.time.toFixed(2)}ms</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricTitle>Вызовов функции</MetricTitle>
                <MetricValue>{fibResult.calls}</MetricValue>
              </MetricCard>
              <MetricCard>
                <MetricTitle>Рендеров</MetricTitle>
                <MetricValue>{renderCount}</MetricValue>
              </MetricCard>
            </MetricsGrid>

            <InfoText>✅ Пересчитывается только при изменении n</InfoText>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💻 Тяжелые вычисления</CardTitle>
            <StatusBadge tone="warning">Демонстрация</StatusBadge>
          </CardHeader>
          <Divider />
          <Column>
            <InputRow>
              <Label>Сложность (0–10):</Label>
              <NumberInput
                value={String(expensiveInput)}
                keyboardType="number-pad"
                onChangeText={setExpensiveInput}
                placeholder="5"
                placeholderTextColor="#889096"
              />
            </InputRow>

            <ResultDisplay>
              <ResultLabel>Результат:</ResultLabel>
              <ResultValue>{expensiveResult.value.toLocaleString()}</ResultValue>
            </ResultDisplay>

            <PerformanceBar>
              <PerformanceLabel>Время: {expensiveResult.time.toFixed(1)}ms</PerformanceLabel>
              <ProgressBar>
                <ProgressFill style={{ width: `${Math.min(100, expensiveResult.time / 10)}%` }} />
              </ProgressBar>
            </PerformanceBar>

            <InfoText>⚡ useMemo предотвращает повторные вычисления</InfoText>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📊 Обработка больших данных</CardTitle>
            <StatusBadge tone="success">{largeDataset.length} элементов</StatusBadge>
          </CardHeader>
          <Divider />
          <Column>
            <SearchInput
              value={query}
              onChangeText={setQuery}
              placeholder="🔍 Поиск по названию или категории..."
              placeholderTextColor="#889096"
            />

            <StatsRow>
              <StatItem>
                <StatLabel>Найдено</StatLabel>
                <StatValue>{processedData.data.length}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Всего</StatLabel>
                <StatValue>{largeDataset.length}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Обработка</StatLabel>
                <StatValue>{processedData.processingTime.toFixed(1)}ms</StatValue>
              </StatItem>
            </StatsRow>

            <PreviewGrid>
              {processedData.data.slice(0, 6).map((item) => (
                <DataCard key={item.id} active={item.isActive}>
                  <ItemLabel>{item.label}</ItemLabel>
                  <ItemCategory>{item.category}</ItemCategory>
                  <ItemValue>{item.value}</ItemValue>
                </DataCard>
              ))}
            </PreviewGrid>

            <InfoText>🚀 Фильтрация и сортировка кешируются</InfoText>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Демонстрация оптимизации</CardTitle>
          </CardHeader>
          <Divider />
          <DemoButton onPress={() => setRenderCount((prev) => prev + 1)}>
            <DemoButtonText>Принудительный ре-рендер ({renderCount})</DemoButtonText>
          </DemoButton>
          <InfoText style={{ marginTop: 12 }}>
            Нажмите кнопку - мемоизированные значения не пересчитываются!
          </InfoText>
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
  flex-direction: column;
  gap: 8px;
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

const StatusBadge = styled(Text)`
  color: ${(props) =>
    props.tone === 'success' ? '#16a34a' : props.tone === 'warning' ? '#ea580c' : '#5eead4'};
  background-color: ${(props) =>
    props.tone === 'success' ? '#0e2f25' : props.tone === 'warning' ? '#2c1810' : '#0d2926'};
  border: 1px solid
    ${(props) =>
      props.tone === 'success' ? '#1f7a4a' : props.tone === 'warning' ? '#c2410c' : '#1f7a4a'};
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  flex: 1;
`;

const InputRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NumberInput = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 8px;
  padding: 8px 12px;
  color: #e6e9ef;
  min-width: 70px;
  text-align: center;
  font-weight: 600;
`;

const ResultDisplay = styled.View`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

const ResultLabel = styled(Text)`
  color: #9aa4b2;
  font-size: 16px;
`;

const ResultValue = styled(Text)`
  color: #5eead4;
  font-size: 18px;
  font-weight: 700;
`;

const MetricsGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

const MetricCard = styled.View`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 8px;
  padding: 8px;
  flex: 1;
  margin: 0 2px;
  align-items: center;
`;

const MetricTitle = styled(Text)`
  color: #9aa4b2;
  font-size: 9px;
  text-align: center;
  margin-bottom: 4px;
`;

const MetricValue = styled(Text)`
  color: #e6e9ef;
  font-weight: 600;
  font-size: 12px;
`;

const PerformanceBar = styled.View`
  margin: 8px 0;
`;

const PerformanceLabel = styled(Text)`
  color: #9aa4b2;
  font-size: 12px;
  margin-bottom: 4px;
`;

const ProgressBar = styled.View`
  height: 6px;
  background-color: #1c2230;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.View`
  height: 100%;
  background-color: #5eead4;
  border-radius: 3px;
`;

const SearchInput = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px 16px;
  color: #e6e9ef;
  margin-bottom: 12px;
  font-size: 14px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatLabel = styled(Text)`
  color: #9aa4b2;
  font-size: 10px;
  margin-bottom: 4px;
`;

const StatValue = styled(Text)`
  color: #5eead4;
  font-weight: 600;
  font-size: 14px;
`;

const PreviewGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 8px 0;
`;

const DataCard = styled.View`
  background-color: ${(props) => (props.active ? '#0e2f25' : '#0f1218')};
  border: 1px solid ${(props) => (props.active ? '#1f7a4a' : '#1c2230')};
  border-radius: 8px;
  padding: 8px;
  margin: 2px;
  width: 48%;
  min-height: 60px;
`;

const ItemLabel = styled(Text)`
  color: #e6e9ef;
  font-size: 10px;
  font-weight: 600;
`;

const ItemCategory = styled(Text)`
  color: #9aa4b2;
  font-size: 8px;
  margin: 2px 0;
`;

const ItemValue = styled(Text)`
  color: #5eead4;
  font-size: 12px;
  font-weight: 700;
`;

const DemoButton = styled.TouchableOpacity`
  background-color: #5eead4;
  padding: 12px 16px;
  border-radius: 12px;
  align-items: center;
`;

const DemoButtonText = styled(Text)`
  color: #052925;
  font-weight: 600;
  font-size: 14px;
`;

const InfoText = styled(Text)`
  color: #9aa4b2;
  font-size: 12px;
  line-height: 16px;
`;

const BottomSpacer = styled.View`
  height: 24px;
`;
