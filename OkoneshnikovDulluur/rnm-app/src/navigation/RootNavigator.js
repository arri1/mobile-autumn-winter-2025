import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UseEffectContainer from "@/screens/UseEffect/UseEffectContainer";
import UseStateContainer from "@/screens/UseState/UseStateContainer";
import UseMemoContainer from '@/screens/UseMemo/UseMemoContainer';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="UseState"
        component={UseStateContainer}
        options={{
          title: "useState",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UseEffect"
        component={UseEffectContainer}
        options={{
          title: "useEffect",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="UseMemo"
        component={UseMemoContainer}
        options={{
          title: "useMemo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
