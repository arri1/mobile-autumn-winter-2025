import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UseStateScreen from '../site/UseState/UseStateScreen';
import UseEffectScreen from '../site/UseEffect/UseEffectScreen';
import UseMemoScreen from '../site/UseMemo/UseMemoScreen';
import UseEffectNetScreen from '../site/UseEffectNet/UseEffectNetScreen';
import StoreLineScreen from '../site/StorLine/StoreLineScreen';
import PostsScreen from '../site/Posts/PostsScreen';
import UsersListScreen from '../site/UserList/UserListScreen';
import useAuthStore from '../auth/auth';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  const { logout, user } = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#222222ff' },
        headerTintColor: '#E6E9EF',
        tabBarStyle: { 
          backgroundColor:  '#222222ff' , 
          borderTopColor:  '#222222ff' ,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#00ff00ff',
        tabBarInactiveTintColor: '#9AA4B2',

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'posts':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
            case 'users':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'useState':
              iconName = focused ? 'code-slash' : 'code-slash-outline';
              break;
            case 'useEffect':
              iconName = focused ? 'sync' : 'sync-outline';
              break;
            case 'useEffectNet':
              iconName = focused ? 'wifi' : 'wifi-outline';
              break;
            case 'useMemo':
              iconName = focused ? 'speedometer' : 'speedometer-outline';
              break;
            case 'storeLine':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerRight: () => (
          <View style={{ 
            marginRight: 15,
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}>
            {user?.email && (
              <Text style={{ 
                color: '#00ff00ff', 
                fontSize: 12,
                marginBottom: 4
              }}>
                {user.email}
              </Text>
            )}
            
            <TouchableOpacity 
              onPress={logout}
              style={{ 
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: '#ff0000ff',
                borderRadius: 6
              }}
            >
              <Text style={{ color: '#E6E9EF', fontWeight: '500' }}>Выйти</Text>
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <Tab.Screen 
        name="posts" 
        component={PostsScreen}
        options={{ title: 'Посты' }}
      />
      <Tab.Screen 
        name="users" 
        component={UsersListScreen}
        options={{ title: 'Пользователи' }}
      />
      <Tab.Screen 
        name="useState" 
        component={UseStateScreen}
        options={{ title: 'useState' }}
      />
      <Tab.Screen 
        name="useEffect" 
        component={UseEffectScreen}
        options={{ title: 'useEffect' }}
      />
      <Tab.Screen 
        name="useEffectNet" 
        component={UseEffectNetScreen}
        options={{ title: 'useEffectNet' }}
      />
      <Tab.Screen 
        name="useMemo" 
        component={UseMemoScreen}
        options={{ title: 'useMemo' }}
      />
      <Tab.Screen 
        name="storeLine" 
        component={StoreLineScreen}
        options={{ title: 'Магазин' }}
      />
    </Tab.Navigator>
  );
}