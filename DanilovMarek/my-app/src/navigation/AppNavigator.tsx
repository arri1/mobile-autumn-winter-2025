import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useEffect from "../screens/UseEffect";
import useState from "../screens/UseState";
import useMemo from "../screens/UseMemo";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="UseState" component={useState} />
            <Tab.Screen name="UseEffect" component={useEffect} />
            <Tab.Screen name="UseMemo" component={useMemo} />
        </Tab.Navigator>
    );
}