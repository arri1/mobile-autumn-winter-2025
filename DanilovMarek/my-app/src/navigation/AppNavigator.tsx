import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useEffect from "../screens/UseEffect";
import useState from "../screens/UseState";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="UseState" component={useState} />
            <Tab.Screen name="UseEffect" component={useEffect} />
        </Tab.Navigator>
    );
}