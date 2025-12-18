import { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const API_HEADERS = {
  "X-API-KEY": "ZB1SM9H-9R6M5DG-HXG2FJV-GSSZN52"
};

const useMoviesSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMoviesByName = async (name, page = 1, limit = 10) => {
    if (!name || name.trim() === '') {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        "query": name.trim(),
        "limit": limit.toString(),
        "page": page.toString(),
      });

      const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?${queryParams}`, {
        headers: API_HEADERS
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const sortedMovies = (data.docs || []).sort((a, b) => {
        const ratingA = a.rating?.kp || a.rating?.imdb || 0;
        const ratingB = b.rating?.kp || b.rating?.imdb || 0;
        return ratingB - ratingA;
      });
      setMovies(sortedMovies);

    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, getMoviesByName };
};


const MoviesSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("Гарри");
  const { movies, loading, error, getMoviesByName } = useMoviesSearch();

  useEffect(() => {
    getMoviesByName(searchQuery, 1, 10);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      getMoviesByName(searchQuery, 1, 10);
    }
  };

  if (loading) {
    return (
      <SafeArea>
        <Container>
          <Header>
            <Title>useEffect</Title>
            <SubTitle>Поиск фильмов</SubTitle>
          </Header>
          <Card>
            <LoadingText>Загрузка фильмов...</LoadingText>
          </Card>
        </Container>
      </SafeArea>
    );
  }

  if (error) {
    return (
      <SafeArea>
        <Container>
          <Header>
            <Title>useEffect</Title>
            <SubTitle>Поиск фильмов</SubTitle>
          </Header>
          <Card>
            <ErrorText>Ошибка: {error}</ErrorText>
          </Card>
        </Container>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Container>
        <Header>
          <Title>useEffect</Title>
          <SubTitle>Поиск фильмов</SubTitle>
        </Header>

        <Card>
          <CardHeader>
            <CardTitle>Поиск фильмов</CardTitle>
          </CardHeader>
          <Divider />
          <SearchContainer>
            <SearchInput
              placeholder="Введите название фильма..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              placeholderTextColor="#889096"
            />
            <SearchButton onPress={handleSearch}>
              <BtnText>Найти</BtnText>
            </SearchButton>
          </SearchContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Результаты</CardTitle>
            <Pill tone={movies.length > 0 ? 'success' : 'neutral'}>
              Найдено: {movies.length}
            </Pill>
          </CardHeader>
          <Divider />
          {movies.map((movie, index) => (
            <MovieItem key={movie.id || index}>
              <MovieTitle>
                {movie.name || movie.alternativeName || movie.enName || 'Название не указано'}
              </MovieTitle>
              
              <MovieInfoRow>
                <MovieInfo>Год: {movie.year || 'не указан'}</MovieInfo>
                <MovieInfo>Рейтинг: {movie.rating?.kp || movie.rating?.imdb || 'нет'}</MovieInfo>
                <MovieInfo>Тип: {movie.type || 'не указан'}</MovieInfo>
              </MovieInfoRow>
              
              {movie.description && (
                <Description numberOfLines={3}>
                  {movie.description}
                </Description>
              )}
              {index < movies.length - 1 && <Divider />}
            </MovieItem>
          ))}
        </Card>

        <BottomSpacer />
      </Container>
    </SafeArea>
  );
};

export default MoviesSearchComponent;

const SafeArea = styled.View`
  flex: 1;
  background-color: #0f2042ff;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px;
  padding-top: 60px;
`;

const Header = styled.View`
  margin-bottom: 16px;
  align-items: center;
  text-align: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 6px;
`;

const SubTitle = styled.Text`
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

const CardTitle = styled.Text`
  color: #e6e9ef;
  font-weight: 700;
`;

const Pill = styled.Text`
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

const SearchContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px 14px;
  color: #e6e9ef;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #4b87a2ff;
  padding: 12px 16px;
  border-radius: 12px;
  justify-content: center;
`;

const BtnText = styled.Text`
  color: #052925;
  font-weight: 700;
`;

const LoadingText = styled.Text`
  color: #e6e9ef;
  text-align: center;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #dc595bff;
  text-align: center;
  font-size: 16px;
`;

const MovieItem = styled.View`
  margin-bottom: 12px;
`;

const MovieTitle = styled.Text`
  color: #e6e9ef;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MovieInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const MovieInfo = styled.Text`
  color: #9aa4b2;
  font-size: 14px;
`;

const Description = styled.Text`
  color: #b3b8c3;
  font-size: 14px;
  line-height: 18px;
  margin-top: 4px;
`;

const BottomSpacer = styled.View`
  height: 24px;
`;