import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateScreen from '../screens/UseStateLab/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectLab/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoLab/UseMemoScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();
 
export default function RootTabs() {
  return (
    <Tab.Navigator

    >
      <Tab.Screen name="useState" component={UseStateScreen} />
      <Tab.Screen name="useEffect" component={UseEffectScreen} />
      <Tab.Screen name="useMemo" component={UseMemoScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}