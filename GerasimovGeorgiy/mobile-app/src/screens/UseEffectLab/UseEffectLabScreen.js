import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export default function UseEffectLabScreen() {
  // Fetch demo
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const fetchPost = async (id = postId) => {
    try {
      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}` , {
        signal: controller.signal,
      });
      const json = await res.json();
      setPost(json);
    } catch (e) {
      // ignore abort errors
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(postId);
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [postId]);

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
          <Title>useEffect Лаборатория</Title>
          <SubTitle>Эффекты монтирования, интервалов и зависимостей</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Загрузка данных</CardTitle>
            <Row>
              <Pill style={{ marginRight: 8 }}>ID: {postId}</Pill>
              <Pill tone={loading ? 'neutral' : 'success'}>{loading ? 'loading' : 'loaded'}</Pill>
            </Row>
          </CardHeader>
          <Divider />
          <Column>
            {loading ? (
              <Row>
                <ActivityIndicator color="#5EEAD4" />
                <Helper ml12>Загружаем пост...</Helper>
              </Row>
            ) : (
              <>
                <Helper>Заголовок:</Helper>
                <CardTitle>{post?.title || '—'}</CardTitle>
              </>
            )}
            <Row space>
              <CounterButton variant="ghost" onPress={() => setPostId(1 + Math.floor(Math.random() * 100))}>
                <BtnText>Random</BtnText>
              </CounterButton>
              <CounterButton variant="ghost" onPress={() => fetchPost()}>
                <BtnText>Обновить</BtnText>
              </CounterButton>
              <CounterButton variant="ghost" onPress={() => abortRef.current?.abort()}>
                <BtnText>Отменить</BtnText>
              </CounterButton>
            </Row>
          </Column>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Интервал</CardTitle>
            <Pill tone={running ? 'success' : 'neutral'}>{running ? 'running' : 'paused'}</Pill>
          </CardHeader>
          <Divider />
          <Row space>
            <CounterValue>{seconds}s</CounterValue>
            <CounterButton onPress={() => setRunning((v) => !v)}>
              <BtnText>{running ? 'Пауза' : 'Старт'}</BtnText>
            </CounterButton>
            <CounterButton variant="ghost" onPress={() => setSeconds(0)}>
              <BtnText>Сброс</BtnText>
            </CounterButton>
          </Row>
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
              placeholder="Введите имя"
              placeholderTextColor="#889096"
            />
            <Helper>{greeting}</Helper>
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


