import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import UseStateScreen from '../site/usestate/usestatescreen';
import UseEffectScreen from '../site/useeffect/useeffectscreen';
import UseMemoScreen from '../site/usememo/usememoscreen';
import UseEffectNetScreen from '../site/useeffectnet/useeffectnetscreen';
import StoreLineScreen from '../site/storline/storelinescreen';
import UserListScreen from '../site/userlist/userlistscreen';
import { useAuthStore } from '../auth/auth';

const Tab = createBottomTabNavigator();
 
export default function RootTabs() {
  const { logout } = useAuthStore();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0D0F14' },
        headerTintColor: '#E6E9EF',
        tabBarStyle: { backgroundColor: '#0D0F14', borderTopColor: '#1C2230' },
        tabBarActiveTintColor: '#00ff00ff',
        tabBarInactiveTintColor: '#9AA4B2',
        headerRight: () => (
          <TouchableOpacity 
            onPress={logout}
            style={{ 
              marginRight: 15,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: '#1C2230',
              borderRadius: 6
            }}
          >
            <Text style={{ color: '#E6E9EF', fontWeight: '500' }}>Выйти</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="useState" component={UseStateScreen} />
      <Tab.Screen name="useEffect" component={UseEffectScreen} />
      <Tab.Screen name="useEffectNet" component={UseEffectNetScreen} />
      <Tab.Screen name="useMemo" component={UseMemoScreen} />
      <Tab.Screen name="storeLine" component={StoreLineScreen} />
      <Tab.Screen name="userList" component={UserListScreen} />
    </Tab.Navigator>
  );
}