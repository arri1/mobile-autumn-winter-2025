import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UseStateScreen from '../site/usestate/usestatescreen';
import UseEffectScreen from '../site/useeffect/useeffectscreen';
import UseMemoScreen from '../site/usememo/usememoscreen';
import UseEffectNetScreen from '../site/useeffectnet/useeffectnetscreen';
import StoreLineScreen from '../site/storline/storelinescreen';
import PostsScreen from '../site/postscreen/PostsScreen';
import UsersListScreen from '../site/userlist/userlistscreen';
import useAuthStore from '../auth/auth';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  const { logout, user } = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#0D0F14' },
        headerTintColor: '#E6E9EF',
        tabBarStyle: { 
          backgroundColor: '#0D0F14', 
          borderTopColor: '#1C2230',
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
                backgroundColor: '#1C2230',
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