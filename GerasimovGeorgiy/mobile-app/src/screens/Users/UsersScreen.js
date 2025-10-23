import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import useAuthStore from '../../store/authStore';
import { Ionicons } from '@expo/vector-icons';

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #0D0F14;
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #E6E9EF;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 10px;
`;

const SearchFilterContainer = styled.View`
  margin-bottom: 20px;
`;

const SearchInput = styled.TextInput`
  background-color: #1C2230;
  color: #E6E9EF;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${props => props.active ? '#5EEAD4' : '#1C2230'};
`;

const FilterButtonText = styled.Text`
  color: ${props => props.active ? '#0D0F14' : '#E6E9EF'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const UserCard = styled.View`
  background-color: #1C2230;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  border-left-width: 4px;
  border-left-color: ${props => props.role === 'ADMIN' ? '#EF4444' : '#5EEAD4'};
`;

const UserAvatar = styled.View`
  margin-right: 16px;
`;

const UserInfo = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #E6E9EF;
  margin-bottom: 4px;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #9AA4B2;
  margin-bottom: 4px;
`;

const UserRoleText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.role === 'ADMIN' ? '#EF4444' : '#5EEAD4'};
  text-transform: uppercase;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px;
  background-color: #1C2230;
  border-radius: 8px;
`;

const PaginationButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? '#2A2F3A' : '#5EEAD4'};
  border-radius: 6px;
`;

const PaginationButtonText = styled.Text`
  color: ${props => props.disabled ? '#6B7280' : '#0D0F14'};
  font-weight: bold;
`;

const PageText = styled.Text`
  color: #E6E9EF;
  font-weight: bold;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: #E6E9EF;
  margin-top: 16px;
  font-size: 16px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ErrorText = styled.Text`
  color: #EF4444;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #5EEAD4;
  padding: 12px 24px;
  border-radius: 8px;
`;

const RetryButtonText = styled.Text`
  color: #0D0F14;
  font-weight: bold;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Emoji = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.Text`
  color: #9AA4B2;
  font-size: 18px;
  text-align: center;
`;

const UsersScreen = () => {
  const { getUsers } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState(''); // 'ADMIN', 'USER', '' (all)
  const limit = 10;

  const fetchUsers = useCallback(async (currentPage = 1, currentSearch = '', currentRole = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers({
        page: currentPage,
        limit,
        search: currentSearch,
        role: currentRole,
      });
      if (response.users) {
        setUsers(response.users);
        setTotalPages(response.pagination.totalPages);
        setPage(response.pagination.currentPage);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      Alert.alert('Ошибка', err.message || 'Не удалось загрузить список пользователей.');
    } finally {
      setIsLoading(false);
    }
  }, [getUsers]);

  useEffect(() => {
    fetchUsers(1, searchQuery, filterRole);
  }, [fetchUsers, searchQuery, filterRole]);

  const handleRefresh = () => {
    fetchUsers(1, searchQuery, filterRole);
  };

  const handleSearch = () => {
    fetchUsers(1, searchQuery, filterRole);
  };

  const handleFilterChange = (role) => {
    setFilterRole(role);
    fetchUsers(1, searchQuery, role);
  };

  const renderUserItem = ({ item }) => (
    <UserCard role={item.role}>
      <UserAvatar>
        <Ionicons name="person-circle-outline" size={40} color="#E6E9EF" />
      </UserAvatar>
      <UserInfo>
        <UserName>{item.name || 'N/A'}</UserName>
        <UserEmail>{item.email}</UserEmail>
        <UserRoleText role={item.role}>{item.role}</UserRoleText>
      </UserInfo>
    </UserCard>
  );

  const renderPagination = () => (
    <PaginationContainer>
      <PaginationButton onPress={() => fetchUsers(page - 1, searchQuery, filterRole)} disabled={page === 1 || isLoading}>
        <PaginationButtonText disabled={page === 1 || isLoading}>Предыдущая</PaginationButtonText>
      </PaginationButton>
      <PageText>Страница {page} из {totalPages}</PageText>
      <PaginationButton onPress={() => fetchUsers(page + 1, searchQuery, filterRole)} disabled={page === totalPages || isLoading}>
        <PaginationButtonText disabled={page === totalPages || isLoading}>Следующая</PaginationButtonText>
      </PaginationButton>
    </PaginationContainer>
  );

  if (isLoading && users.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#5EEAD4" />
        <LoadingText>Загрузка пользователей...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error && users.length === 0) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <RetryButton onPress={handleRefresh}>
          <RetryButtonText>Повторить</RetryButtonText>
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Список Пользователей</Title>
      </Header>

      <SearchFilterContainer>
        <SearchInput
          placeholder="Поиск по имени или email"
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <FilterContainer>
          <FilterButton active={filterRole === ''} onPress={() => handleFilterChange('')}>
            <FilterButtonText active={filterRole === ''}>Все</FilterButtonText>
          </FilterButton>
          <FilterButton active={filterRole === 'ADMIN'} onPress={() => handleFilterChange('ADMIN')}>
            <FilterButtonText active={filterRole === 'ADMIN'}>Админы</FilterButtonText>
          </FilterButton>
          <FilterButton active={filterRole === 'USER'} onPress={() => handleFilterChange('USER')}>
            <FilterButtonText active={filterRole === 'USER'}>Пользователи</FilterButtonText>
          </FilterButton>
        </FilterContainer>
      </SearchFilterContainer>

      {users.length === 0 && !isLoading ? (
        <EmptyStateContainer>
          <Emoji>🤷‍♂️</Emoji>
          <EmptyStateText>Пользователи не найдены.</EmptyStateText>
        </EmptyStateContainer>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor="#5EEAD4"
            />
          }
          ListFooterComponent={totalPages > 1 ? renderPagination : null}
        />
      )}
    </Container>
  );
};

export default UsersScreen;
