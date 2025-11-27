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
      setMovies(data.docs || []);

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
  const { movies, loading, error, getMoviesByName } = useMoviesSearch();

  useEffect(() => {
    // Поиск с лимитом 10 фильмов
    getMoviesByName("гарри", 1, 50);
  }, []);

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

const AlternativeName = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  font-style: italic;
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