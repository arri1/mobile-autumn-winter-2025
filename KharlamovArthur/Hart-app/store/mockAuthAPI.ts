import AsyncStorage from '@react-native-async-storage/async-storage';

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_USER = {
  id: '1',
  username: 'test_user',
  email: 'test@example.com',
  role: 'user',
  createdAt: new Date().toISOString(),
};

const MOCK_TOKENS = {
  accessToken: 'mock_access_token_12345',
  refreshToken: 'mock_refresh_token_67890',
};

const healthCheck = async () => {
  await delay(300);
  return { success: true, message: 'Mock server is running' };
};

const register = async (userData) => {
  await delay();
  console.log('Mock Register called with:', userData);
  return { success: true, message: 'Регистрация успешна' };
};

const login = async (credentials) => {
  await delay();
  console.log('Mock Login called with:', credentials);
  
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return { 
      success: true, 
      data: { 
        ...MOCK_TOKENS, 
        user: MOCK_USER 
      } 
    };
  }
  
  /*
  return { 
    success: true, 
    data: { 
      ...MOCK_TOKENS, 
      user: { ...MOCK_USER, email: credentials.email || MOCK_USER.email } 
    } 
  };
  */

  return { success: false, message: 'Неверный email или пароль (Используйте test@example.com / password)' };
};

const getProfile = async (token) => {
  await delay();
  if (!token) throw new Error('Unauthorized');
  
  return { success: true, data: MOCK_USER };
};

const refreshToken = async () => {
  await delay();
  return { 
    success: true, 
    data: {
      accessToken: 'new_mock_access_token_' + Date.now(),
      refreshToken: 'new_mock_refresh_token_' + Date.now()
    } 
  };
};

const logout = async (token) => {
  await delay(500);
  return { success: true, message: 'Logged out successfully' };
};

const getUsers = async (token, params = {}) => {
  await delay();
  return { success: true, data: [MOCK_USER] };
};

const getIceServers = async () => {
  await delay();
  return { success: true, data: [] };
};


const apiService ={
  healthCheck,
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  getUsers,
  getIceServers
};
export default apiService;