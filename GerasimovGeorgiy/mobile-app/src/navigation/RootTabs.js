import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UseStateLabScreen from '../screens/UseStateLab/UseStateLabScreen';
import UseEffectLabScreen from '../screens/UseEffectLab/UseEffectLabScreen';
import UseMemoLabScreen from '../screens/UseMemoLab/UseMemoLabScreen';

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
        <Tab.Screen name="useState" component={UseStateLabScreen} />
        <Tab.Screen name="useEffect" component={UseEffectLabScreen} />
        <Tab.Screen name="useMemo" component={UseMemoLabScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
