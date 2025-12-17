import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UseStateScreen from '../screens/UseStateLab/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectLab/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoLab/UseMemoScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PostsScreen from '../screens/PostsScreen/PostsScreen';

// Создаем экземпляр Tab Navigator для нижней панели вкладок
const Tab = createBottomTabNavigator();

// Основной компонент с корневой навигацией по вкладкам
export default function RootTabs() {
  return (
    <Tab.Navigator // контейнер для управления вкладками
      screenOptions={{  // общие настройки для всех вкладок
        headerStyle: { backgroundColor: '#0D0F14' }, 
        headerTintColor: '#E6E9EF', 
        tabBarStyle: { backgroundColor: '#0D0F14', borderTopColor: '#1C2230' }, // Стиль нижней панели вкладок
        tabBarActiveTintColor: '#5EEAD4',
        tabBarInactiveTintColor: '#9AA4B2',
      }}
    >
      <Tab.Screen //Экран для демонстрации работы React хука useState
        name="useState" 
        component={UseStateScreen} // Компонент экрана
        options={{
          tabBarIcon: ({ color, size }) => (
            // ИЗМЕНИТЕ ЭТУ СТРОКУ - выберите подходящую иконку
            <Ionicons name="git-branch-outline" size={size} color={color} />
          ),
          title: 'useState', // Заголовок вкладки и экрана
        }}
      />
      <Tab.Screen //Экран для демонстрации работы React хука useEffect
        name="useEffect" 
        component={UseEffectScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          ),
          title: 'useEffect',
        }}
      />
      <Tab.Screen // Экран для демонстрации работы React хука useMemo
        name="useMemo" 
        component={UseMemoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator-outline" size={size} color={color} />
          ),
          title: 'useMemo',
        }}
      />
      <Tab.Screen 
        name="profile" // Экран профиля пользователя
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            //// Иконка "персона" для профиля пользователя
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          title: 'Профиль',
        }}
      />
      <Tab.Screen 
        name="Posts" 
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          title: 'Посты',
        }}
      />
    </Tab.Navigator>
  );
}