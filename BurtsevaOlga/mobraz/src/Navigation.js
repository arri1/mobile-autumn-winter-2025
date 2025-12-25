import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from './store/authStore';


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import UseStateScreen from './screens/UseState';
import UseEffectScreen from './screens/UseEffect';
import UseMemoScreen from './screens/UseMemo';
import ProfileScreen from './screens/ProfileScreen';
import PostsScreen from './screens/PostsScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import MyPostsScreen from './screens/MyPostsScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import EditPostScreen from './screens/EditPostScreen';

const Stack = createStackNavigator();


const MainStack = () => (
  <Stack.Navigator
    initialRouteName="Home"  
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ 
        title: 'React Hooks',
      }}
    />
    <Stack.Screen 
      name="UseState" 
      component={UseStateScreen}
      options={{ title: 'useState Примеры' }}
    />
    <Stack.Screen 
      name="UseEffect" 
      component={UseEffectScreen}
      options={{ title: 'useEffect Примеры' }}
    />
    <Stack.Screen 
      name="UseMemo" 
      component={UseMemoScreen}
      options={{ title: 'useMemo Примеры' }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'Профиль' }}
    />
    <Stack.Screen 
      name="Posts" 
      component={PostsScreen}
      options={{ title: 'Посты' }}
    />
    <Stack.Screen 
      name="CreatePost" 
      component={CreatePostScreen}
      options={{ title: 'Новый пост' }}
    />
    <Stack.Screen 
      name="MyPosts" 
      component={MyPostsScreen}
      options={{ title: 'Мои посты' }}
    />
    <Stack.Screen 
      name="PostDetail" 
      component={PostDetailScreen}
      options={{ title: 'Пост' }}
    />
    <Stack.Screen 
      name="EditPost" 
      component={EditPostScreen} 
      options={{ title: 'Редактировать' }} 
    />
  </Stack.Navigator>
);


const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"  
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007AFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ 
        title: 'Вход',
        headerShown: true,
      }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ 
        title: 'Регистрация',
        headerShown: true,
      }}
    />
  </Stack.Navigator>
  
);

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;