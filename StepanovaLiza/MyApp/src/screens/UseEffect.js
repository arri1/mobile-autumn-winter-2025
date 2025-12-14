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
      <CenterContainer>
        <LoadingText>Загрузка фильмов...</LoadingText>
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        <ErrorText>Ошибка: {error}</ErrorText>
      </CenterContainer>
    );
  }

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          placeholder="Введите название фильма..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <SearchButton onPress={handleSearch}>
          <SearchButtonText>Найти</SearchButtonText>
        </SearchButton>
      </SearchContainer>
      
      <Header>
        <ResultsCount>Найдено фильмов: {movies.length}</ResultsCount>
      </Header>
      
      {movies.map((movie, index) => (
        <MovieItem key={movie.id || index}>
          <Title>
            {movie.name || movie.alternativeName || movie.enName || 'Название не указано'}
          </Title>
          
          <InfoRow>
            <InfoText>Год: {movie.year || 'не указан'}</InfoText>
            <InfoText>Рейтинг: {movie.rating?.kp || movie.rating?.imdb || 'нет'}</InfoText>
            <InfoText>Тип: {movie.type || 'не указан'}</InfoText>
          </InfoRow>
          
          {movie.description && (
            <Description numberOfLines={3}>
              {movie.description}
            </Description>
          )}
        </MovieItem>
      ))}
    </Container>
  );
};

export default MoviesSearchComponent;


const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
  padding: 8px 12px;
  background-color: white;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  margin-right: 8px;
`;

const SearchButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #007AFF;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const SearchButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const Header = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: red;
  text-align: center;
`;

const ResultsCount = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const MovieItem = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #555;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #444;
  margin-top: 8px;
  line-height: 18px;
`;

const ShortDescription = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 6px;
  font-style: italic;
`;