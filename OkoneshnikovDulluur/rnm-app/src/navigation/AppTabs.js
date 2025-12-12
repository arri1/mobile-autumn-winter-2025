import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UseStateContainer from "@/screens/UseState/UseStateContainer";
import UseEffectContainer from "@/screens/UseEffect/UseEffectContainer";
import UseMemoContainer from "@/screens/UseMemo/UseMemoContainer";
import ZustandControlContainer from "@/screens/ZustandControl/ZustandControlContainer";
import ZustandHistoryContainer from "@/screens/ZustandHistory/ZustandHistoryContainer";
import ProfileContainer from "@/screens/Profile/ProfileContainer";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="UseState"
        component={UseStateContainer}
        options={{
          title: "useState",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="counter" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UseEffect"
        component={UseEffectContainer}
        options={{
          title: "useEffect",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="download" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UseMemo"
        component={UseMemoContainer}
        options={{
          title: "useMemo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pen" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ZustandControl"
        component={ZustandControlContainer}
        options={{
          title: "Zustand",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ZustandHistory"
        component={ZustandHistoryContainer}
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
