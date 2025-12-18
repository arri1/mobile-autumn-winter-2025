import styled from 'styled-components/native';

// Определяем тему
const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#00ff00ff',
      modalBackground: '#FFFFFF',
      danger: '#ff0000ff',
      warning: '#ffff00ff',
      success: '#103db9ff',
      muted: '#6B7280',
      lightMuted: '#9AA4B2',
    },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: '#333333',
    button: '#00ff00ff',
    modalBackground: '#1E1E1E',
    primary: '#00ff00ff',
    secondary: '#2A2F3A',
    danger: '#ff0000ff',
    warning: '#ffff00ff',
    success: '#103db9ff',
    muted: '#6B7280',
    lightMuted: '#9AA4B2',
  }
};

const currentTheme = theme.dark;

const Container = styled.View`
  flex: 1;
  background-color: ${currentTheme.background};
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
  color: ${currentTheme.text};
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${currentTheme.primary};
  padding: 10px 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const AddButtonText = styled.Text`
  color: #000000;
  font-weight: bold;
  font-size: 14px;
`;

const SearchFilterContainer = styled.View`
  margin-bottom: 20px;
`;

const SearchInput = styled.TextInput`
  background-color: ${currentTheme.card};
  color: ${currentTheme.text};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  border-width: 1px;
  border-color: ${currentTheme.border};
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${props => props.active ? currentTheme.primary : currentTheme.card};
  border-width: 1px;
  border-color: ${props => props.active ? currentTheme.primary : currentTheme.border};
`;

const FilterButtonText = styled.Text`
  color: ${props => props.active ? '#000000' : currentTheme.text};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const PostCard = styled.View`
  background-color: ${currentTheme.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${currentTheme.border};
  border-left-width: 4px;
  border-left-color: ${props => props.published ? currentTheme.primary : currentTheme.lightMuted};
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
  color: ${currentTheme.text};
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
  color: ${currentTheme.lightMuted};
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
  color: ${currentTheme.muted};
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: ${currentTheme.muted};
`;

const StatusBadge = styled.View`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${props => props.published ? currentTheme.success : currentTheme.muted};
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
  background-color: ${currentTheme.card};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${currentTheme.border};
`;

const PaginationButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? currentTheme.border : currentTheme.primary};
  border-radius: 6px;
`;

const PaginationButtonText = styled.Text`
  color: ${props => props.disabled ? currentTheme.muted : '#000000'};
  font-weight: bold;
`;

const PageText = styled.Text`
  color: ${currentTheme.text};
  font-weight: bold;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${currentTheme.background};
`;

const LoadingText = styled.Text`
  color: ${currentTheme.text};
  margin-top: 16px;
  font-size: 16px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${currentTheme.background};
`;

const ErrorText = styled.Text`
  color: ${currentTheme.danger};
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: ${currentTheme.primary};
  padding: 12px 24px;
  border-radius: 8px;
`;

const RetryButtonText = styled.Text`
  color: #000000;
  font-weight: bold;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: ${currentTheme.background};
`;

const Emoji = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyStateText = styled.Text`
  color: ${currentTheme.lightMuted};
  font-size: 18px;
  text-align: center;
`;

// Modal styles
const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.View`
  background-color: ${currentTheme.modalBackground};
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  border-width: 1px;
  border-color: ${currentTheme.border};
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${currentTheme.text};
  margin-bottom: 20px;
  text-align: center;
`;

const ModalInput = styled.TextInput`
  background-color: ${currentTheme.background};
  color: ${currentTheme.text};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  min-height: 50px;
  border-width: 1px;
  border-color: ${currentTheme.border};
`;

const ModalTextArea = styled.TextInput`
  background-color: ${currentTheme.background};
  color: ${currentTheme.text};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
  min-height: 120px;
  text-align-vertical: top;
  border-width: 1px;
  border-color: ${currentTheme.border};
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
  background-color: ${props => props.primary ? currentTheme.primary : currentTheme.secondary};
  border-width: 1px;
  border-color: ${props => props.primary ? currentTheme.primary : currentTheme.border};
  min-height: 40px;
  align-items: center;
  justify-content: center;
`;

const ModalButtonText = styled.Text`
  color: ${props => props.primary ? '#000000' : currentTheme.text};
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
  border-color: ${currentTheme.primary};
  background-color: ${props => props.checked ? currentTheme.primary : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const CheckboxLabel = styled.Text`
  color: ${currentTheme.text};
  font-size: 16px;
`;

// Дополнительные компоненты для кнопок в стиле вашего примера
const ButtonRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const HalfButton = styled.TouchableOpacity`
  flex: 1;
  margin-horizontal: 5px;
  background-color: ${props => props.variant === 'stop' ? currentTheme.danger : currentTheme.primary};
  padding-vertical: 12px;
  border-radius: 8px;
  align-items: center;
  margin-vertical: 5px;
  min-width: 200px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
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
  ButtonRow,
  HalfButton,
  ButtonText,
  currentTheme,
};