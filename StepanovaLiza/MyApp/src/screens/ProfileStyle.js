import styled from 'styled-components/native';


export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;


export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

export const LoadingText = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
`;

export const Header = styled.View`
  align-items: center;
  padding: 40px 20px 30px;
`;

export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 20px;
  border-width: 3px;
  border-color: #007AFF;
`;

export const UserName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

export const UserEmail = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

export const MemberSince = styled.Text`
  font-size: 14px;
  color: #888;
`;

export const Section = styled.View`
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

export const InfoCard = styled.View`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-width: 1px;
  border-color: #e9ecef;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #e9ecef;
  margin-vertical: 5px;
`;

export const ActionButton = styled.TouchableOpacity`
  background-color: ${props => props.danger ? '#dc3545' : '#007AFF'};
  border-radius: 10px;
  padding: 16px;
  align-items: center;
  margin-bottom: 12px;
`;

export const ActionButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const DemoNote = styled.View`
  background-color: #fff3cd;
  border-radius: 8px;
  padding: 15px;
  margin: 20px;
  border-width: 1px;
  border-color: #ffeaa7;
`;

export const DemoNoteText = styled.Text`
  color: #856404;
  font-size: 14px;
  text-align: center;
`;

// Стили для формы авторизации
export const WelcomeTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

export const WelcomeSubtitle = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  padding-horizontal: 20px;
`;

export const ErrorContainer = styled.View`
  background-color: #f8d7da;
  border-radius: 8px;
  padding: 15px;
  margin: 0 20px 20px;
  border-width: 1px;
  border-color: #f5c6cb;
`;

export const ErrorText = styled.Text`
  color: #721c24;
  font-size: 14px;
  text-align: center;
`;

export const Form = styled.View`
  padding: 0 20px;
  margin-bottom: 30px;
`;

export const Input = styled.TextInput`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  border-width: 1px;
  border-color: #e9ecef;
  color: #333;
`;

export const InputSpacer = styled.View`
  height: 15px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 10px;
`;

export const ForgotPasswordText = styled.Text`
  color: #007AFF;
  font-size: 14px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 10px;
  padding: 18px;
  margin: 0 20px;
  align-items: center;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

export const SubmitButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

export const SwitchModeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding-horizontal: 20px;
`;

export const SwitchModeText = styled.Text`
  color: #666;
  font-size: 16px;
  margin-right: 5px;
`;

export const SwitchModeButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const SwitchModeButtonText = styled.Text`
  color: #007AFF;
  font-size: 16px;
  font-weight: 600;
`;

export const DemoCredentials = styled.View`
  background-color: #e7f5ff;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 20px 0;
  border-width: 1px;
  border-color: #c5e6ff;
`;

export const DemoTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #0056b3;
  margin-bottom: 10px;
`;

export const DemoText = styled.Text`
  font-size: 14px;
  color: #0056b3;
  margin-bottom: 3px;
`;