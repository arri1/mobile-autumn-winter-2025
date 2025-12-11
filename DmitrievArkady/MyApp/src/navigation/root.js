import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateScreen from '../screens/Main/UseStateScreen';
import UseEffectScreen from '../screens/Main/UseEffectScreen';
import UseMemoScreen from '../screens/Main/UseMemoScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

const Tab = createBottomTabNavigator();
 
export default function RootTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="useState" component={UseStateScreen} />
      <Tab.Screen name="useEffect" component={UseEffectScreen} />
      <Tab.Screen name="useMemo" component={UseMemoScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}