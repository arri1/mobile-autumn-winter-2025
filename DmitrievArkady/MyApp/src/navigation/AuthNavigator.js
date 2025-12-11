import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Tab = createMaterialTopTabNavigator();

export default function AuthNavigator() {
    return (
        <Tab.Navigator screenOptions={{lazy: true, tabBarStyle: { marginTop: StatusBar.currentHeight }}}>
            <Tab.Screen name="Вход" component={LoginScreen} />
            <Tab.Screen name="Регистрация" component={RegisterScreen} />
        </Tab.Navigator>
    );
}