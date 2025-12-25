import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './store/authStore';
import AuthProvider from './components/AuthProvider';
import UseStateLab from './screens/UseState';
import UseEffectLab from './screens/UseEffect';
import UseMemoLab from './screens/UseMemo';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ZustandScreen from './screens/Zustand';
import PostsScreen from './screens/posts/Posts';
import PostDetailScreen from './screens/posts/PostDetail';
import CreatePostScreen from './screens/posts/CreatePost';
import EditPostScreen from './screens/posts/EditPost';
import LogoutScreen from './screens/Logout';

// Импорт иконок
const useStateIcon = require('./images/usestate.png');
const useEffectIcon = require('./images/useeffect.png');
const useMemoIcon = require('./images/usememo.png');
const zustandIcon = require('./images/zustand.png');
const postsIcon = require('./images/posts.png');
const exitIcon = require('./images/exit.png');

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const PostsStack = createNativeStackNavigator();

function PostsNavigator() {
  return (
    <PostsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <PostsStack.Screen 
        name="Posts" 
        component={PostsScreen}
        options={{ title: 'Посты' }}
      />
      <PostsStack.Screen 
        name="PostDetail" 
        component={PostDetailScreen}
        options={{ title: 'Детали поста' }}
      />
      <PostsStack.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{ title: 'Создать пост' }}
      />
      <PostsStack.Screen 
        name="EditPost" 
        component={EditPostScreen}
        options={{ title: 'Редактировать пост' }}
      />
    </PostsStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="UseState"
      screenOptions={{
        tabBarActiveTintColor: '#0000ff',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Tab.Screen 
        name="UseState" 
        component={UseStateLab}
        options={{ 
          title: 'UseState Lab',
          tabBarLabel: 'UseState',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={useStateIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="UseEffect" 
        component={UseEffectLab}
        options={{ 
          title: 'UseEffect Lab',
          tabBarLabel: 'UseEffect',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={useEffectIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="UseMemo" 
        component={UseMemoLab}
        options={{ 
          title: 'UseMemo Lab',
          tabBarLabel: 'UseMemo',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={useMemoIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Zustand" 
        component={ZustandScreen}
        options={{ 
          title: 'Zustand',
          tabBarLabel: 'Zustand',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={zustandIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Posts" 
        component={PostsNavigator}
        options={{ 
          title: 'Посты',
          tabBarLabel: 'Посты',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={postsIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Logout" 
        component={LogoutScreen}
        options={{ 
          title: 'Logout',
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, focused }) => (
            <Image 
              source={exitIcon} 
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.6 }} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Вход' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Регистрация' }}
      />
    </Stack.Navigator>
  );
}

function AppContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

