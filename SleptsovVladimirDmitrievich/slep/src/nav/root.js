import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
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
      screenOptions={{
        headerStyle: { backgroundColor: '#0D0F14' },
        headerTintColor: '#E6E9EF',
        tabBarStyle: { backgroundColor: '#0D0F14', borderTopColor: '#1C2230' },
        tabBarActiveTintColor: '#00ff00ff',
        tabBarInactiveTintColor: '#9AA4B2',
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
      }}
    >
      <Tab.Screen name="posts" component={PostsScreen} />
      <Tab.Screen name="users" component={UsersListScreen} />
      <Tab.Screen name="useState" component={UseStateScreen} />
      <Tab.Screen name="useEffect" component={UseEffectScreen} />
      <Tab.Screen name="useEffectNet" component={UseEffectNetScreen} />
      <Tab.Screen name="useMemo" component={UseMemoScreen} />
      <Tab.Screen name="storeLine" component={StoreLineScreen} />
    </Tab.Navigator>
  );
}