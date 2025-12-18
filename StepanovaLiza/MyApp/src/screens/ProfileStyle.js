import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
`;

export const SafeArea = styled.ScrollView`
  flex: 1;
  padding: 24px;
  padding-top: 60px;
  background-color: #0f2042ff;
`;

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0f2042ff;
  padding: 20px;
`;

export const Header = styled.View`
  margin-bottom: 16px;
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 6px;
`;

export const SubTitle = styled.Text`
  color: #9aa4b2;
`;

export const Card = styled.View`
  background-color: #0c0f14;
  border: 1px solid #1c2230;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.Text`
  color: #e6e9ef;
  font-weight: 700;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #1c2230;
  margin: 12px 0;
`;

// Стили для профиля
export const ProfileContainer = styled.View`
  align-items: center;
  padding: 16px 0;
`;

export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 20px;
  border-width: 3px;
  border-color: #4b87a2ff;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #e6e9ef;
  margin-bottom: 5px;
`;

export const UserEmail = styled.Text`
  font-size: 16px;
  color: #9aa4b2;
  margin-bottom: 10px;
`;

export const MemberSince = styled.Text`
  font-size: 14px;
  color: #889096;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: #9aa4b2;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #e6e9ef;
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: #dc595bff;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

export const BtnText = styled.Text`
  color: #052925;
  font-weight: 700;
`;

export const LoadingText = styled.Text`
  color: #e6e9ef;
  text-align: center;
  font-size: 16px;
`;

// Стили для формы
export const ErrorContainer = styled.View`
  background-color: #552525;
  border: 1px solid #dc595bff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
`;

export const ErrorText = styled.Text`
  color: #dc595bff;
  font-size: 14px;
  text-align: center;
`;

export const Input = styled.TextInput`
  background-color: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px 14px;
  color: #e6e9ef;
`;

export const InputSpacer = styled.View`
  height: 12px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const ForgotPasswordText = styled.Text`
  color: #4b87a2ff;
  font-size: 14px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #4b87a2ff;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

export const SwitchModeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SwitchModeText = styled.Text`
  color: #9aa4b2;
  font-size: 16px;
  margin-right: 8px;
`;

export const SwitchModeButton = styled.TouchableOpacity`
  padding: 8px;
`;

export const SwitchModeButtonText = styled.Text`
  color: #4b87a2ff;
  font-size: 16px;
  font-weight: 700;
`;

export const Helper = styled.Text`
  color: #9aa4b2;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const BottomSpacer = styled.View`
  height: 24px;
`;