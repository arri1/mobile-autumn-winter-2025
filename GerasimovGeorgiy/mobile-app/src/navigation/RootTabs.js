import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import UseStateLabScreen from '../screens/UseStateLab/UseStateLabScreen';
import UseEffectLabScreen from '../screens/UseEffectLab/UseEffectLabScreen';
import UseMemoLabScreen from '../screens/UseMemoLab/UseMemoLabScreen';
import ZustandLabScreen from '../screens/ZustandLab/ZustandLabScreen';
import UsersScreen from '../screens/Users/UsersScreen';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0D0F14' },
          headerTintColor: '#E6E9EF',
          tabBarStyle: { backgroundColor: '#0D0F14', borderTopColor: '#1C2230' },
          tabBarActiveTintColor: '#5EEAD4',
          tabBarInactiveTintColor: '#9AA4B2',
        }}
      >
        <Tab.Screen 
          name="useState" 
          component={UseStateLabScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="state-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="useEffect" 
          component={UseEffectLabScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flash-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="useMemo" 
          component={UseMemoLabScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="zustand" 
          component={ZustandLabScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="users" 
          component={UsersScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
            title: 'Пользователи',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
