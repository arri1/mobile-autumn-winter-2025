import styled from 'styled-components/native';

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

const AddButton = styled.TouchableOpacity`
  background-color: #5EEAD4;
  padding: 10px 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const AddButtonText = styled.Text`
  color: #0D0F14;
  font-weight: bold;
  font-size: 14px;
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

const PostCard = styled.View`
  background-color: #1C2230;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  border-left-width: 4px;
  border-left-color: ${props => props.published ? '#5EEAD4' : '#9AA4B2'};
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #E6E9EF;
  flex: 1;
  margin-right: 8px;
`;

const PostActions = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ActionButton = styled.TouchableOpacity`
  padding: 6px;
`;

const PostContent = styled.Text`
  font-size: 14px;
  color: #9AA4B2;
  margin-bottom: 12px;
  line-height: 20px;
`;

const PostMeta = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const PostAuthor = styled.Text`
  font-size: 12px;
  color: #6B7280;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: #6B7280;
`;

const StatusBadge = styled.View`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${props => props.published ? '#10B981' : '#6B7280'};
  margin-left: 8px;
`;

const StatusText = styled.Text`
  color: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
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

// Modal styles
const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.View`
  background-color: #1C2230;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #E6E9EF;
  margin-bottom: 20px;
`;

const ModalInput = styled.TextInput`
  background-color: #0D0F14;
  color: #E6E9EF;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  min-height: 50px;
`;

const ModalTextArea = styled.TextInput`
  background-color: #0D0F14;
  color: #E6E9EF;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  min-height: 120px;
  text-align-vertical: top;
`;

const ModalActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${props => props.primary ? '#5EEAD4' : '#2A2F3A'};
`;

const ModalButtonText = styled.Text`
  color: ${props => props.primary ? '#0D0F14' : '#E6E9EF'};
  font-weight: bold;
`;

const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border-width: 2px;
  border-color: #5EEAD4;
  background-color: ${props => props.checked ? '#5EEAD4' : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const CheckboxLabel = styled.Text`
  color: #E6E9EF;
  font-size: 16px;
`;

export {
  Container,
  Header,
  Title,
  AddButton,
  AddButtonText,
  SearchFilterContainer,
  SearchInput,
  FilterContainer,
  FilterButton,
  FilterButtonText,
  PostCard,
  PostHeader,
  PostTitle,
  PostActions,
  ActionButton,
  PostContent,
  PostMeta,
  PostAuthor,
  PostDate,
  StatusBadge,
  StatusText,
  PaginationContainer,
  PaginationButton,
  PaginationButtonText,
  PageText,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton,
  RetryButtonText,
  EmptyStateContainer,
  Emoji,
  EmptyStateText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalInput,
  ModalTextArea,
  ModalActions,
  ModalButton,
  ModalButtonText,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
};

