import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import UseEffectScreen from "../screens/Main/UseEffectScreen";
import useStateScreen from "../screens/Main/UseStateScreen";
import useMemoScreen from "../screens/Main/UseMemoScreen";
import ProfileScreen from "../screens/Main/ProfileScreen";
import PostsScreen from "../screens/Main/PostsScreen"

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="UseState" 
                component={useStateScreen} 
                options={{
                    title: "useState",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkbox-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="UseEffect" 
                component={UseEffectScreen} 
                options={{
                    title: "useEffect",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="refresh" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="UseMemo" 
                component={useMemoScreen} 
                options={{
                    title: "useMemo",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calculator-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Posts" 
                component={PostsScreen} 
                options={{
                    title: "Posts",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
