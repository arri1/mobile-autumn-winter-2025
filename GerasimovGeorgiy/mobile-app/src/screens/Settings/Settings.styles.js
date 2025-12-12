import styled from 'styled-components/native';
import { Text } from 'react-native';
const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0b0c10;
`;

const Container = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
`;

const Header = styled.View`
  padding: 24px 0;
  border-bottom-width: 1px;
  border-bottom-color: #1c2230;
  margin-bottom: 24px;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)`
  color: #9aa4b2;
  font-size: 16px;
`;

const Card = styled.View`
  background-color: #1a1a1a;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const CardHeader = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #2a2a2a;
`;

const CardTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #2a2a2a;
`;

const SettingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const SettingInfo = styled.View`
  flex: 1;
`;

const SettingLabel = styled(Text)`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 4px;
`;

const SettingDescription = styled(Text)`
  font-size: 14px;
  color: #9aa4b2;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: #dc2626;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
`;

const LogoutButtonText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

const UserInfo = styled.View`
  padding: 16px;
  background-color: #1a1a1a;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const UserName = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
`;

const UserEmail = styled(Text)`
  font-size: 14px;
  color: #9aa4b2;
`;

const SectionTitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  margin-top: 24px;
`;

export {
  SafeArea,
  Container,
  Header,
  Title,
  Subtitle,
  UserInfo,
  UserName,
  UserEmail,
  SectionTitle,
  Card,
  CardHeader,
  CardTitle,
  Divider,
  SettingRow,
  SettingInfo,
  SettingLabel,
  SettingDescription,
  LogoutButton,
  LogoutButtonText,
};
