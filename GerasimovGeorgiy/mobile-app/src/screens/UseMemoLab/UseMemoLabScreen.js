import { useState, useCallback, useMemo, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import styled from 'styled-components/native';

export default function UseMemoLabScreen() {
  const [loading, setLoading] = useState(false);
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getLoad();
    return () => {
      setImages([]);
    };
  }, []);

  // Загружаем картинки из API
  const loadImages = useMemo(async () => {
    setLoading(true);
    let result = [];
    try {
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
      const data = await response.json();
      const formattedImages = data.map((item, index) => ({
        id: item.id,
        title: `Фото ${index + 1}`,
        url: item.download_url,
        author: item.author,
      }));
      result = formattedImages;
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить картинки');
    } finally {
      setLoading(false);
    }
    return result;
  }, []);
  const loadImagesWithoutMemo = async () => {
    setLoading(true);
    let result = [];
    try {
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
      const data = await response.json();
      const formattedImages = data.map((item, index) => ({
        id: item.id,
        title: `Фото ${index + 1}`,
        url: item.download_url,
        author: item.author,
      }));
      result = formattedImages;
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить картинки');
    } finally {
      setLoading(false);
    }
    return result;
  };

  const getLoad = async () => {
    if (useMemoEnabled) setImages(await loadImages);
    else setImages(await loadImagesWithoutMemo());
  };

  const handleImagePress = useCallback((item) => {
    Alert.alert('Картинка', `Выбрана: ${item.title}\nАвтор: ${item.author}`);
  }, []);


  return (
    <SafeArea>
      <Container>
        <Header>
          <Emoji>🖼️</Emoji>
          <Title>Галерея картинок</Title>
          <SubTitle>Загрузка из интернета</SubTitle>
        </Header>
        <Card>
          <CardHeader>
            <CardTitle>Настройки</CardTitle>
            <Pill tone={useMemoEnabled ? 'success' : 'neutral'}>
              {useMemoEnabled ? 'useMemo включен' : 'useMemo выключен'}
            </Pill>
          </CardHeader>
          <Divider />
          <SwitchRow>
            <SwitchText>Использовать useMemo</SwitchText>
            <Switch value={useMemoEnabled} onValueChange={setUseMemoEnabled} />
          </SwitchRow>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Галерея</CardTitle>
            <ReloadButton onPress={getLoad} disabled={loading}>
              <ReloadText>{loading ? '⏳' : '🔄'} Перезагрузить</ReloadText>
            </ReloadButton>
          </CardHeader>
          <Divider />
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#5eead4" size="large" />
              <Helper>Загружаем картинки из интернета...</Helper>
            </LoadingContainer>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <GalleryRow>
                {images.map((item) => (
                  <ImageCard key={item.id} onPress={() => handleImagePress(item)}>
                    <Image
                      source={{ uri: item.url }}
                      style={{ width: 120, height: 120, borderRadius: 8 }}
                    />
                    <ImageTitle>{item.title}</ImageTitle>
                    <ImageAuthor>by {item.author}</ImageAuthor>
                  </ImageCard>
                ))}
              </GalleryRow>
            </ScrollView>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Информация</CardTitle>
          </CardHeader>
          <Divider />
          <InfoList>
            <InfoItem>
              <InfoIcon>🌐</InfoIcon>
              <InfoText>Картинки загружаются с picsum.photos</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>🔍</InfoIcon>
              <InfoText>Поиск работает по названию и автору</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📱</InfoIcon>
              <InfoText>Прокрутите горизонтально для просмотра</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>🔄</InfoIcon>
              <InfoText>Нажмите "Перезагрузить" для новых картинок</InfoText>
            </InfoItem>
          </InfoList>
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

const Input = styled(TextInput)`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px 14px;
  color: #e6e9ef;
  margin-bottom: 8px;
`;

const Helper = styled(Text)`
  color: #9aa4b2;
  text-align: center;
`;

const ReloadButton = styled.TouchableOpacity`
  background-color: ${(p) => (p.disabled ? '#2a2f3a' : '#5eead4')};
  padding: 8px 12px;
  border-radius: 8px;
  align-items: center;
`;

const ReloadText = styled(Text)`
  color: ${(p) => (p.disabled ? '#6b7280' : '#052925')};
  font-weight: 700;
  font-size: 12px;
`;

const LoadingContainer = styled.View`
  align-items: center;
  padding: 20px;
  gap: 12px;
`;

const GalleryRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ImageCard = styled.TouchableOpacity`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 8px;
  align-items: center;
  min-width: 140px;
`;

const ImageTitle = styled(Text)`
  color: #e6e9ef;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
`;

const ImageAuthor = styled(Text)`
  color: #9aa4b2;
  font-size: 10px;
  text-align: center;
  margin-top: 2px;
`;

const InfoList = styled.View`
  gap: 12px;
`;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const InfoIcon = styled(Text)`
  font-size: 20px;
`;

const InfoText = styled(Text)`
  color: #9aa4b2;
  flex: 1;
  line-height: 20px;
`;

const SwitchRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SwitchText = styled(Text)`
  color: #e6e9ef;
  font-size: 16px;
  font-weight: 500;
`;

const BottomSpacer = styled.View`
  height: 24px;
`;
