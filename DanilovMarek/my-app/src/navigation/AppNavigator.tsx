import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UseEffectScreen from "../screens/Main/UseEffectScreen";
import useStateScreen from "../screens/Main/UseStateScreen";
import useMemoScreen from "../screens/Main/UseMemoScreen";
import ProfileScreen from "../screens/Main/ProfileScreen";
import PostsScreen from "../screens/Main/PostsScreen"

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="UseState" component={useStateScreen} />
            <Tab.Screen name="UseEffect" component={UseEffectScreen} />
            <Tab.Screen name="UseMemo" component={useMemoScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Posts" component={PostsScreen} />
        </Tab.Navigator>
    );
}
